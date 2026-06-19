import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Settings } from './schemas/settings.schema'

@Injectable()
export class SettingsService {
  constructor(@InjectModel(Settings.name) private model: Model<Settings>) {}

  async get() {
    let settings = await this.model.findOne()
    if (!settings) {
      // Create default settings on first call
      settings = await this.model.create({})
    }
    return settings
  }

  async update(dto: any) {
    let settings = await this.model.findOne()
    if (!settings) {
      settings = await this.model.create(dto)
    } else {
      settings = await this.model.findByIdAndUpdate(settings._id, dto, { new: true })
    }
    return settings
  }
}