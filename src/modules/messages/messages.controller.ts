import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { MessagesService } from './messages.service'
@ApiTags('messages')
@ApiBearerAuth('JWT')
@UseGuards(AuthGuard('jwt'))
@Controller('messages')
export class MessagesController {
  constructor(private readonly svc: MessagesService) {}
  @Get('conversations') getConvos() { return this.svc.getConversations() }
  @Get(':conversationId') getMsgs(@Param('conversationId') id: string) { return this.svc.getMessages(id) }
  @Post() send(@Body() dto: any) { return this.svc.send(dto) }
  @Patch(':conversationId/read') markRead(@Param('conversationId') id: string) { return this.svc.markRead(id) }
  @Post('broadcast') broadcast(@Body() dto: any) { return this.svc.broadcast(dto) }
}
