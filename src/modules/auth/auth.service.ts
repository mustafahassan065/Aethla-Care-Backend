import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'
import * as crypto from 'crypto'
import * as nodemailer from 'nodemailer'
import { User } from '../users/schemas/user.schema'
import { ActivityService } from '../activity/activity.service'

@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private activityService: ActivityService,
  ) {
    // SMTP login uses mustafaprogrammer786@gmail.com — "From" display uses Aethlacare@gmail.com
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('SMTP_USER'),  // actual login account
        pass: this.configService.get('SMTP_PASS'),  // app password
      },
    })
  }

  private get fromAddress(): string {
    const name  = this.configService.get('SMTP_FROM_NAME', 'Aethla Care')
    const email = this.configService.get('SMTP_FROM_EMAIL', 'Aethlacare@gmail.com')
    return `"${name}" <${email}>`
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({
      email: new RegExp('^' + email + '$', 'i'),
      isActive: true,
    }).select('+password')
    if (!user) throw new UnauthorizedException('Invalid credentials')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new UnauthorizedException('Invalid credentials')
    const { password: _, ...result } = user.toObject()
    return result
  }

  async login(loginDto: { email: string; password: string }, ipAddress?: string) {
    const user = await this.validateUser(loginDto.email, loginDto.password)
    const payload = { sub: user._id, email: user.email, role: user.role }
    const accessToken  = this.jwtService.sign(payload)
    const refreshToken = this.jwtService.sign(payload, {
      secret:     this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn:  this.configService.get('JWT_REFRESH_EXPIRES_IN', '30d'),
    })

    await this.userModel.findByIdAndUpdate(user._id, { lastLoginAt: new Date() })

    await this.activityService.log({
      userId:      user._id.toString(),
      userEmail:   user.email,
      userRole:    user.role,
      action:      'LOGIN',
      module:      'auth',
      description: `${user.firstName} ${user.lastName} (${user.role}) logged in`,
      ipAddress,
      level:       'success',
    })

    return { accessToken, refreshToken, user }
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      })
      const user = await this.userModel.findById(payload.sub)
      if (!user || !user.isActive) throw new UnauthorizedException()
      const newPayload = { sub: user._id, email: user.email, role: user.role }
      return { accessToken: this.jwtService.sign(newPayload) }
    } catch {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }

  async logout(userId: string, userEmail?: string) {
    await this.activityService.log({
      userId,
      userEmail,
      action:      'LOGOUT',
      module:      'auth',
      description: 'User logged out',
      level:       'success',
    })
    return { message: 'Logged out successfully' }
  }

  // ── Password Reset ─────────────────────────────────────────
  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({
      email: new RegExp('^' + email + '$', 'i')
    })
    if (!user) return { message: 'If that email exists, a reset link has been sent.' }

    const token   = crypto.randomBytes(32).toString('hex')
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await this.userModel.findByIdAndUpdate(user._id, {
      passwordResetToken:   token,
      passwordResetExpires: expires,
    })

    const siteUrl = this.configService.get('SITE_URL', 'https://www.aethlacare.com')
    let resetUrl = `${siteUrl}/admin/reset-password?token=${token}`
    if (user.role === 'caregiver') resetUrl = `${siteUrl}/employee/reset-password?token=${token}`
    if (user.role === 'family')    resetUrl = `${siteUrl}/portal/reset-password?token=${token}`

    try {
      await this.transporter.sendMail({
        from:    this.fromAddress,
        to:      user.email,
        subject: 'Reset Your Aethla Care Password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #1B6B8A, #2DA88A); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Aethla Care</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Password Reset Request</p>
            </div>
            <h2 style="color: #1B6B8A;">Hello, ${user.firstName}</h2>
            <p style="color: #555; line-height: 1.6;">
              We received a request to reset the password for your Aethla Care account.
              Click the button below to set a new password.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}"
                style="background: linear-gradient(135deg, #1B6B8A, #2DA88A); color: white; padding: 14px 32px;
                       text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Reset My Password
              </a>
            </div>
            <p style="color: #999; font-size: 14px;">
              This link expires in <strong>1 hour</strong>. If you did not request a password reset, please ignore this email.
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 20px;">
              Or copy this link: <br/>
              <a href="${resetUrl}" style="color: #1B6B8A;">${resetUrl}</a>
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;"/>
            <p style="color: #ccc; font-size: 12px; text-align: center;">
              Aethla Care · Premium Home Healthcare · Qatar
            </p>
          </div>
        `,
      })
    } catch (e) {
      console.error('Email send failed:', e)
    }

    return { message: 'If that email exists, a reset link has been sent.' }
  }

  async resetPassword(token: string, password: string) {
    const user = await this.userModel.findOne({
      passwordResetToken:   token,
      passwordResetExpires: { $gt: new Date() },
    })
    if (!user) throw new BadRequestException('Invalid or expired reset token')

    const hash = await bcrypt.hash(password, 12)
    await this.userModel.findByIdAndUpdate(user._id, {
      password:             hash,
      passwordResetToken:   null,
      passwordResetExpires: null,
    })

    return { message: 'Password reset successfully. You can now log in.' }
  }

  // ── Notifications Email ────────────────────────────────────
  async sendNotificationEmail(to: string, subject: string, html: string) {
    try {
      await this.transporter.sendMail({
        from: this.fromAddress,
        to, subject, html,
      })
    } catch (e) {
      console.error('Notification email failed:', e)
    }
  }
}