import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BlogPost } from '../blog/schemas/blog-post.schema'
import { Consultation } from './schemas/consultation.schema'
import { CareerApplication } from './schemas/career-application.schema'

@Injectable()
export class PublicService {
  constructor(
    @InjectModel(BlogPost.name)         private blogModel:        Model<BlogPost>,
    @InjectModel(Consultation.name)     private consultationModel: Model<Consultation>,
    @InjectModel(CareerApplication.name) private careerModel:      Model<CareerApplication>,
  ) {}

  async submitConsultation(dto: any) {
    const consultation = await this.consultationModel.create({
      firstName: dto.firstName,
      lastName:  dto.lastName,
      phone:     dto.phone,
      email:     dto.email,
      service:   dto.service,
      location:  dto.location,
      message:   dto.message,
      status:    'new',
    })
    return { success: true, message: 'Consultation request received. We will contact you within 2 hours.' }
  }

  async getConsultations(query: any) {
    const { page = 1, limit = 20, status } = query
    const filter: any = {}
    if (status && status !== '') filter.status = status
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

  // Careers — save to database
  async submitCareerApp(dto: any) {
    await this.careerModel.create({
      firstName:    dto.firstName,
      lastName:     dto.lastName,
      email:        dto.email,
      phone:        dto.phone,
      role:         dto.role,
      experience:   dto.experience,
      availability: dto.availability || [],
      message:      dto.message,
      status:       'new',
    })
    return { success: true, message: 'Application received. We will review and contact you within 3-5 working days.' }
  }

  // Admin: get career applications
  async getCareerApplications(query: any) {
    const { page = 1, limit = 20, status } = query
    const filter: any = {}
    if (status && status !== '') filter.status = status
    const [data, total] = await Promise.all([
      this.careerModel.find(filter).skip((+page-1)*+limit).limit(+limit).sort({ createdAt: -1 }),
      this.careerModel.countDocuments(filter),
    ])
    return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total/+limit) }
  }

  async updateCareerApplication(id: string, dto: any) {
    const a = await this.careerModel.findByIdAndUpdate(id, dto, { new: true })
    if (!a) throw new NotFoundException('Application not found')
    return a
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
    return this.blogModel.findOneAndUpdate(
      { slug, published: true },
      { $inc: { views: 1 } },
      { new: true }
    )
  }

  async getTestimonials() {
    return [
      { name: 'Fatima Al-Mansouri', location: 'Doha', service: 'Elderly Care', rating: 5, text: 'Exceptional support for my mother after surgery.' },
      { name: 'Khalid Al-Rashid',   location: 'Lusail', service: 'Newborn Care', rating: 5, text: 'Our baby nurse was outstanding.' },
      { name: 'Sara Al-Qahtani',    location: 'Al Rayyan', service: 'Elderly Care', rating: 5, text: 'The family portal gives me real peace of mind.' },
    ]
  }

  async getFaqs() {
    return [
      { q: 'What home healthcare services does Aethla Care provide in Qatar?', a: 'Aethla Care provides elderly care, disability support, maternity care, newborn care, telehealth coordination, and preventative wellness services across Qatar.' },
      { q: 'Do you provide live-in caregivers in Doha?', a: 'Yes, Aethla Care offers both live-in and scheduled caregiver support services.' },
      { q: 'Is your care team multilingual?', a: 'Yes, our caregivers and coordinators support multiple languages for Qatar\'s diverse community.' },
    ]
  }
}