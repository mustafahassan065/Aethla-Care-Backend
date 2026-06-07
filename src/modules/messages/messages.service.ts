import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Message } from './schemas/message.schema'
@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private model: Model<Message>) {}
  async getConversations() {
    return this.model.aggregate([
      { $sort: { createdAt: -1 } },
      { $group: { _id: '$conversationId', lastMessage: { $first: '$$ROOT' }, count: { $sum: 1 } } },
    ])
  }
  async getMessages(conversationId: string) {
    return this.model.find({ conversationId }).populate('senderId', 'firstName lastName avatar').sort({ createdAt: 1 }).limit(100)
  }
  async send(dto: any) { return this.model.create(dto) }
  async markRead(conversationId: string) {
    return this.model.updateMany({ conversationId, isRead: false }, { isRead: true })
  }
  async broadcast(dto: any) {
    const messages = dto.recipientIds.map((rid: string) => ({ ...dto, recipientIds: [rid], conversationId: `broadcast_${Date.now()}` }))
    return this.model.insertMany(messages)
  }
}
