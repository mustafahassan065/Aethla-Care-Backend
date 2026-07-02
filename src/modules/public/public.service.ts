import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import * as bcrypt from 'bcryptjs'
import { BlogPost } from '../blog/schemas/blog-post.schema'
import { Consultation } from './schemas/consultation.schema'
import { CareerApplication } from './schemas/career-application.schema'
import { PatientSignup, EmployeeSignup } from './schemas/signup.schema'

@Injectable()
export class PublicService {
  constructor(
    @InjectModel(BlogPost.name)          private blogModel:           Model<BlogPost>,
    @InjectModel(Consultation.name)      private consultationModel:   Model<Consultation>,
    @InjectModel(CareerApplication.name) private careerModel:         Model<CareerApplication>,
    @InjectModel(PatientSignup.name)     private patientSignupModel:  Model<PatientSignup>,
    @InjectModel(EmployeeSignup.name)    private employeeSignupModel: Model<EmployeeSignup>,
    @InjectModel('User')                 private userModel:           Model<any>,
    @InjectModel('Client')               private clientModel:         Model<any>,
    @InjectModel('Caregiver')            private caregiverModel:      Model<any>,
    @InjectModel('AdminSignup')          private adminSignupModel:    Model<any>,
  ) {}

  async submitConsultation(dto: any) {
    await this.consultationModel.create({
      firstName: dto.firstName, lastName: dto.lastName,
      phone: dto.phone, email: dto.email,
      service: dto.service, location: dto.location,
      message: dto.message, status: 'new',
    })
    return { success: true, message: 'Consultation request received. We will contact you within 2 hours.' }
  }

  async getConsultations(query: any) {
    const { page = 1, limit = 20, status } = query
    const filter: any = {}
    if (status) filter.status = status
    const [data, total] = await Promise.all([
      this.consultationModel.find(filter).skip((+page-1)*+limit).limit(+limit).sort({ createdAt: -1 }),
      this.consultationModel.countDocuments(filter),
    ])
    return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total/+limit) }
  }

  async updateConsultation(id: string, dto: any) {
    const c = await this.consultationModel.findByIdAndUpdate(id, dto, { new: true })
    if (!c) throw new NotFoundException('Consultation not found')
    return c
  }

  async submitCareerApp(dto: any) {
    await this.careerModel.create({ ...dto, status: 'new' })
    return { success: true, message: 'Application received. We will review and contact you within 3-5 working days.' }
  }

  async getCareerApplications(query: any) {
    const { page = 1, limit = 20, status } = query
    const filter: any = {}
    if (status) filter.status = status
    const [data, total] = await Promise.all([
      this.careerModel.find(filter).skip((+page-1)*+limit).limit(+limit).sort({ createdAt: -1 }),
      this.careerModel.countDocuments(filter),
    ])
    return { data, total, page: +page, limit: +limit }
  }

  async updateCareerApplication(id: string, dto: any) {
    const a = await this.careerModel.findByIdAndUpdate(id, dto, { new: true })
    if (!a) throw new NotFoundException('Application not found')
    return a
  }

  async submitPatientSignup(dto: any) {
    const existing = await this.patientSignupModel.findOne({ email: dto.email })
    if (existing) throw new BadRequestException('An application with this email already exists')
    await this.patientSignupModel.create({ ...dto, status: 'pending' })
    return { success: true, message: 'Registration submitted. Our care coordinator will contact you within 24 hours.' }
  }

  async getPatientSignups(query: any) {
    const { page = 1, limit = 20, status } = query
    const filter: any = {}
    if (status) filter.status = status
    const [data, total] = await Promise.all([
      this.patientSignupModel.find(filter).skip((+page-1)*+limit).limit(+limit).sort({ createdAt: -1 }),
      this.patientSignupModel.countDocuments(filter),
    ])
    return { data, total, page: +page, limit: +limit }
  }

  async approvePatientSignup(id: string, clientId?: string) {
    const signup = await this.patientSignupModel.findById(id)
    if (!signup) throw new NotFoundException('Signup not found')

    // Create or find user
    let user = await this.userModel.findOne({ email: signup.email })
    if (!user) {
      const hash = await bcrypt.hash(signup.password, 12)
      user = await this.userModel.create({
        firstName:   signup.firstName   || '',
        lastName:    signup.lastName    || '',
        email:       signup.email,
        phone:       signup.phone       || '',
        password:    hash,
        role:        'family',
        accountType: signup.accountType || 'patient',
        isActive:    true,
        isVerified:  true,
      })
    }

    if (clientId) {
      // Admin manually linked a client
      await this.clientModel.findByIdAndUpdate(
        new Types.ObjectId(clientId),
        { userId: user._id }
      )
    } else {
      // Auto-create client record linked to this user
      const existingClient = await this.clientModel.findOne({ userId: user._id })
      if (!existingClient) {
        const patientFirst = signup.isSelf
          ? (signup.firstName || '')
          : (signup.patientFirstName || signup.firstName || '')
        const patientLast = signup.isSelf
          ? (signup.lastName || '')
          : (signup.patientLastName || signup.lastName || '')

        await this.clientModel.create({
          userId:             user._id,
          firstName:          patientFirst,
          lastName:           patientLast,
          email:              signup.email,
          phone:              signup.phone       || '',
          status:             'active',
          careType:           [],
          medicalConditions:  [],
          allergies:          [],
          medications:        [],
          emergencyContacts:  [],
          assignedCaregivers: [],
          consentSigned:      false,
        })
      } else if (!existingClient.userId) {
        // Client exists but not linked — link it
        await this.clientModel.findByIdAndUpdate(existingClient._id, { userId: user._id })
      }
    }

    await this.patientSignupModel.findByIdAndUpdate(id, { status: 'approved' })
    return { success: true, userId: user._id }
  }

  async rejectPatientSignup(id: string) {
    await this.patientSignupModel.findByIdAndUpdate(id, { status: 'rejected' })
    return { success: true }
  }

  async undoPatientSignup(id: string) {
    await this.patientSignupModel.findByIdAndUpdate(id, { status: 'pending' })
    return { success: true }
  }

  async deletePatientSignup(id: string) {
    await this.patientSignupModel.findByIdAndDelete(id)
    return { success: true }
  }

  async submitEmployeeSignup(dto: any) {
    const existing = await this.employeeSignupModel.findOne({ email: dto.email })
    if (existing) throw new BadRequestException('An application with this email already exists')
    await this.employeeSignupModel.create({ ...dto, status: 'pending' })
    return { success: true, message: 'Application submitted. We will review your credentials within 3-5 working days.' }
  }

  async getEmployeeSignups(query: any) {
    const { page = 1, limit = 20, status } = query
    const filter: any = {}
    if (status) filter.status = status
    const [data, total] = await Promise.all([
      this.employeeSignupModel.find(filter).skip((+page-1)*+limit).limit(+limit).sort({ createdAt: -1 }),
      this.employeeSignupModel.countDocuments(filter),
    ])
    return { data, total, page: +page, limit: +limit }
  }

  async approveEmployeeSignup(id: string) {
    const signup = await this.employeeSignupModel.findById(id)
    if (!signup) throw new NotFoundException('Signup not found')

    const existingUser = await this.userModel.findOne({ email: signup.email })
    if (existingUser) {
      const existingCg = await this.caregiverModel.findOne({ userId: existingUser._id })
      if (!existingCg) {
        await this.caregiverModel.create({
          userId: existingUser._id,
          specializations: signup.specialization ? [signup.specialization] : [],
          licenseNumber: signup.licenseNumber || '',
          experience: parseInt(signup.experience) || 0,
          status: 'active', backgroundCheckStatus: 'pending', rating: 0,
        })
      }
      await this.employeeSignupModel.findByIdAndUpdate(id, { status: 'approved' })
      return { success: true, userId: existingUser._id }
    }

    const hash = await bcrypt.hash(signup.password, 12)
    const user = await this.userModel.create({
      firstName: signup.firstName || '', lastName: signup.lastName || '',
      email: signup.email, phone: signup.phone || '',
      password: hash, role: 'caregiver', isActive: true, isVerified: true,
    })
    await this.caregiverModel.create({
      userId: user._id,
      specializations: signup.specialization ? [signup.specialization] : [],
      licenseNumber: signup.licenseNumber || '',
      experience: parseInt(signup.experience) || 0,
      status: 'active', backgroundCheckStatus: 'pending', rating: 0,
    })
    await this.employeeSignupModel.findByIdAndUpdate(id, { status: 'approved' })
    return { success: true, userId: user._id }
  }

  async rejectEmployeeSignup(id: string) {
    await this.employeeSignupModel.findByIdAndUpdate(id, { status: 'rejected' })
    return { success: true }
  }

  async undoEmployeeSignup(id: string) {
    await this.employeeSignupModel.findByIdAndUpdate(id, { status: 'pending' })
    return { success: true }
  }

  async deleteEmployeeSignup(id: string) {
    await this.employeeSignupModel.findByIdAndDelete(id)
    return { success: true }
  }

  async submitAdminSignup(dto: any) {
    const existingSignup = await this.adminSignupModel.findOne({ email: dto.email })
    if (existingSignup) throw new BadRequestException('A request with this email already exists')
    const existingUser = await this.userModel.findOne({ email: dto.email })
    if (existingUser) throw new BadRequestException('An account with this email already exists')
    await this.adminSignupModel.create({ ...dto, status: 'pending' })
    return { success: true, message: 'Access request submitted. An administrator will review your request.' }
  }

  async getAdminSignups(query: any) {
    const { page = 1, limit = 20, status } = query
    const filter: any = {}
    if (status) filter.status = status
    const [data, total] = await Promise.all([
      this.adminSignupModel.find(filter).skip((+page-1)*+limit).limit(+limit).sort({ createdAt: -1 }),
      this.adminSignupModel.countDocuments(filter),
    ])
    return { data, total, page: +page, limit: +limit }
  }

  async approveAdminSignup(id: string) {
    const signup = await this.adminSignupModel.findById(id)
    if (!signup) throw new NotFoundException('Signup not found')
    const existingUser = await this.userModel.findOne({ email: signup.email })
    if (existingUser) {
      await this.adminSignupModel.findByIdAndUpdate(id, { status: 'approved' })
      return { success: true, userId: existingUser._id }
    }
    const hash = await bcrypt.hash(signup.password, 12)
    const user = await this.userModel.create({
      firstName: signup.firstName || '', lastName: signup.lastName || '',
      email: signup.email, phone: signup.phone || '',
      password: hash, role: 'admin', isSuperAdmin: false,
      isActive: true, isVerified: true,
    })
    await this.adminSignupModel.findByIdAndUpdate(id, { status: 'approved' })
    return { success: true, userId: user._id }
  }

  async rejectAdminSignup(id: string) {
    await this.adminSignupModel.findByIdAndUpdate(id, { status: 'rejected' })
    return { success: true }
  }

  async undoAdminSignup(id: string) {
    await this.adminSignupModel.findByIdAndUpdate(id, { status: 'pending' })
    return { success: true }
  }

  async deleteAdminSignup(id: string) {
    await this.adminSignupModel.findByIdAndDelete(id)
    return { success: true }
  }

  async getBlog(query: any) {
    const { page = 1, limit = 9, category } = query
    const filter: any = { published: true }
    if (category) filter.category = category
    const [data, total] = await Promise.all([
      this.blogModel.find(filter).select('-content').skip((+page-1)*+limit).limit(+limit).sort({ publishedAt: -1 }),
      this.blogModel.countDocuments(filter),
    ])
    return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total/+limit) }
  }

  async getBlogPost(slug: string) {
    return this.blogModel.findOneAndUpdate({ slug, published: true }, { $inc: { views: 1 } }, { new: true })
  }

  async getTestimonials() {
    return [
      { name: 'Fatima Al-Mansouri', location: 'Doha',      service: 'Elderly Care', rating: 5, text: 'Exceptional support for my mother after surgery.' },
      { name: 'Khalid Al-Rashid',   location: 'Lusail',    service: 'Newborn Care', rating: 5, text: 'Our baby nurse was outstanding.' },
      { name: 'Sara Al-Qahtani',    location: 'Al Rayyan', service: 'Elderly Care', rating: 5, text: 'The family portal gives me real peace of mind.' },
    ]
  }

  async getFaqs() {
    return [
      { q: 'What home healthcare services does Aethla Care provide in Qatar?', a: 'Aethla Care provides elderly care, disability support, maternity care, newborn care, telehealth coordination, and preventative wellness services across Qatar.' },
      { q: 'Do you provide live-in caregivers in Doha?', a: 'Yes, Aethla Care offers both live-in and scheduled caregiver support services.' },
      { q: 'Is your care team multilingual?', a: 'Yes, our caregivers and coordinators support multiple languages for our diverse community.' },
    ]
  }
}