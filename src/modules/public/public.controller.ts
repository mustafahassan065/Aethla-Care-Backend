import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { PublicService } from './public.service'

@ApiTags('public')
@Controller('public')
export class PublicController {
  constructor(private readonly svc: PublicService) {}

  // Public endpoints (no auth)
  @Post('consultation')
  submitConsultation(@Body() dto: any) { return this.svc.submitConsultation(dto) }

  @Post('careers')
  submitCareerApp(@Body() dto: any) { return this.svc.submitCareerApp(dto) }

  @Get('blog')
  getBlog(@Query() q: any) { return this.svc.getBlog(q) }

  @Get('blog/:slug')
  getBlogPost(@Param('slug') slug: string) { return this.svc.getBlogPost(slug) }

  @Get('testimonials')
  getTestimonials() { return this.svc.getTestimonials() }

  @Get('faqs')
  getFaqs() { return this.svc.getFaqs() }

  // Admin endpoints (JWT required)
  @Get('consultations')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  getConsultations(@Query() q: any) { return this.svc.getConsultations(q) }

  @Patch('consultations/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  updateConsultation(@Param('id') id: string, @Body() dto: any) {
    return this.svc.updateConsultation(id, dto)
  }
}