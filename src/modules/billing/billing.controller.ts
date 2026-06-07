import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { BillingService } from './billing.service'

@ApiTags('billing')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('billing')
export class BillingController {
  constructor(private readonly svc: BillingService) {}

  @Get('invoices')
  getAll(@Query() q: any) {
    // clientId ko completely ignore karo agar valid ObjectId nahi hai
    const cleanQuery = {
      page:   q.page   || 1,
      limit:  q.limit  || 20,
      status: q.status || '',
      // clientId sirf tab pass karo jab 24-char hex ho
      ...(q.clientId && /^[a-fA-F0-9]{24}$/.test(q.clientId)
        ? { clientId: q.clientId }
        : {}),
    }
    return this.svc.findAll(cleanQuery)
  }

  @Get('invoices/:id')
  getOne(@Param('id') id: string) {
    return this.svc.findOne(id)
  }

  @Post('invoices')
  create(@Body() dto: any) {
    return this.svc.create(dto)
  }

  @Patch('invoices/:id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.svc.update(id, dto)
  }

  @Post('invoices/:id/send')
  send(@Param('id') id: string) {
    return this.svc.sendInvoice(id)
  }

  @Get('summary')
  getSummary(@Query() q: any) {
    return this.svc.getSummary(q)
  }
}