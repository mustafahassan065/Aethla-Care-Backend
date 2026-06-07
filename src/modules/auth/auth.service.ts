import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'
import { User } from '../users/schemas/user.schema'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email, isActive: true }).select('+password')
    if (!user) throw new UnauthorizedException('Invalid credentials')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new UnauthorizedException('Invalid credentials')
    const { password: _, ...result } = user.toObject()
    return result
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password)
    const payload = { sub: user._id, email: user.email, role: user.role }
    const accessToken = this.jwtService.sign(payload)
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '30d'),
    })
    await this.userModel.findByIdAndUpdate(user._id, { lastLoginAt: new Date() })
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

  async logout(userId: string) {
    return { message: 'Logged out successfully' }
  }

  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ email })
    if (!user) return { message: 'If that email exists, a reset link has been sent.' }
    // TODO: Generate token, send email via Nodemailer
    return { message: 'Password reset link sent to your email.' }
  }

  async resetPassword(token: string, password: string) {
    // TODO: Verify token, update password
    const hashedPassword = await bcrypt.hash(password, 12)
    return { message: 'Password reset successfully.' }
  }
}
