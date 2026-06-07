import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { BlogPost } from '../blog/schemas/blog-post.schema'
import { Consultation } from './schemas/consultation.schema'

@Injectable()
export class PublicService {
  constructor(
    @InjectModel(BlogPost.name)    private blogModel:         Model<BlogPost>,
    @InjectModel(Consultation.name) private consultationModel: Model<Consultation>,
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
    console.log('New consultation request saved:', consultation._id)
    return {
      success: true,
      message: 'Consultation request received. We will contact you within 2 hours.',
    }
  }

  // Admin: get all consultations
  async getConsultations(query: any) {
    const { page = 1, limit = 20, status } = query
    const filter: any = {}
    if (status && status !== '') filter.status = status

    const [data, total] = await Promise.all([
      this.consultationModel
        .find(filter)
        .skip((+page - 1) * +limit)
        .limit(+limit)
        .sort({ createdAt: -1 }),
      this.consultationModel.countDocuments(filter),
    ])
    return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total / +limit) }
  }

  // Admin: update consultation status
  async updateConsultation(id: string, dto: any) {
    const c = await this.consultationModel.findByIdAndUpdate(id, dto, { new: true })
    if (!c) throw new NotFoundException('Consultation not found')
    return c
  }

  async submitCareerApp(dto: any) {
    console.log('New career application:', dto)
    return { success: true, message: 'Application received. We will review and contact you soon.' }
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
      { name: 'Fatima Al-Mansouri', location: 'Doha', service: 'Elderly Care', rating: 5, text: 'Exceptional service for my mother after hip surgery.' },
      { name: 'Khalid Al-Rashid',   location: 'Lusail', service: 'Newborn Care', rating: 5, text: 'Our baby nurse was a lifesaver for first-time parents.' },
      { name: 'Sara Al-Qahtani',    location: 'Al Rayyan', service: 'Elderly Care', rating: 5, text: 'The family portal gave me complete peace of mind.' },
    ]
  }

  async getFaqs() {
    return [
      { q: 'What areas do you serve?', a: 'Doha, Lusail, Al Wakrah, Al Rayyan, and surrounding areas of Qatar.' },
      { q: 'How quickly can care begin?', a: 'Within 24-48 hours of assessment. Urgent cases can begin same-day.' },
      { q: 'Are caregivers licensed?', a: 'Yes — all are MoH verified, background checked, and continuously trained.' },
    ]
  }
}