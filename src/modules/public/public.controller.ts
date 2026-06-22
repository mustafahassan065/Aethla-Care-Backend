import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { PublicService } from './public.service'

@ApiTags('public')
@Controller('public')
export class PublicController {
  constructor(private readonly svc: PublicService) {}

  // ── Public endpoints ──────────────────────────────────────

  @Post('consultation')
  submitConsultation(@Body() dto: any) { return this.svc.submitConsultation(dto) }

  @Post('careers')
  submitCareerApp(@Body() dto: any) { return this.svc.submitCareerApp(dto) }

  @Post('patient-signup')
  submitPatientSignup(@Body() dto: any) { return this.svc.submitPatientSignup(dto) }

  @Post('employee-signup')
  submitEmployeeSignup(@Body() dto: any) { return this.svc.submitEmployeeSignup(dto) }

  @Get('blog')
  getBlog(@Query() q: any) { return this.svc.getBlog(q) }

  @Get('blog/:slug')
  getBlogPost(@Param('slug') slug: string) { return this.svc.getBlogPost(slug) }

  @Get('testimonials')
  getTestimonials() { return this.svc.getTestimonials() }

  @Get('faqs')
  getFaqs() { return this.svc.getFaqs() }

  // ── Admin — Consultations ─────────────────────────────────

  @Get('consultations')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  getConsultations(@Query() q: any) { return this.svc.getConsultations(q) }

  @Patch('consultations/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  updateConsultation(@Param('id') id: string, @Body() dto: any) { return this.svc.updateConsultation(id, dto) }

  // ── Admin — Career Applications ───────────────────────────

  @Get('careers/applications')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  getCareerApplications(@Query() q: any) { return this.svc.getCareerApplications(q) }

  @Patch('careers/applications/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  updateCareerApplication(@Param('id') id: string, @Body() dto: any) { return this.svc.updateCareerApplication(id, dto) }

  // ── Admin — Patient Signups ───────────────────────────────

  @Get('patient-signups')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  getPatientSignups(@Query() q: any) { return this.svc.getPatientSignups(q) }

  @Post('patient-signups/:id/approve')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  approvePatientSignup(@Param('id') id: string, @Body() body: any) {
    return this.svc.approvePatientSignup(id, body.clientId)
  }

  @Patch('patient-signups/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  updatePatientSignup(@Param('id') id: string, @Body() dto: any) {
    if (dto.status === 'rejected') return this.svc.rejectPatientSignup(id)
    if (dto.status === 'pending')  return this.svc.undoPatientSignup(id)
    return this.svc.updateConsultation(id, dto)
  }

  @Delete('patient-signups/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  deletePatientSignup(@Param('id') id: string) { return this.svc.deletePatientSignup(id) }

  // ── Admin — Employee Signups ──────────────────────────────

  @Get('employee-signups')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  getEmployeeSignups(@Query() q: any) { return this.svc.getEmployeeSignups(q) }

  @Post('employee-signups/:id/approve')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  approveEmployeeSignup(@Param('id') id: string) { return this.svc.approveEmployeeSignup(id) }

  @Patch('employee-signups/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  updateEmployeeSignup(@Param('id') id: string, @Body() dto: any) {
    if (dto.status === 'rejected') return this.svc.rejectEmployeeSignup(id)
    if (dto.status === 'pending')  return this.svc.undoEmployeeSignup(id)
    return { success: true }
  }

  @Delete('employee-signups/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('JWT')
  deleteEmployeeSignup(@Param('id') id: string) { return this.svc.deleteEmployeeSignup(id) }
}