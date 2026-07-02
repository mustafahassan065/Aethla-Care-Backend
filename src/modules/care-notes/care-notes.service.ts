import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CareNote } from './schemas/care-note.schema'

@Injectable()
export class CareNotesService {
  constructor(
    @InjectModel(CareNote.name) private model: Model<CareNote>,
  ) {}

  async findAll(query: any) {
    const { page = 1, limit = 20, clientId, caregiverId, familyShared } = query
    const filter: any = {}

    if (clientId) {
      try { filter.clientId = new Types.ObjectId(clientId) } catch { filter.clientId = clientId }
    }
    if (caregiverId) {
      try { filter.caregiverId = new Types.ObjectId(caregiverId) } catch { filter.caregiverId = caregiverId }
    }
    if (familyShared === 'true' || familyShared === true) {
      filter.familyShared = true
    }

    const [data, total] = await Promise.all([
      this.model
        .find(filter)
        .populate('clientId', 'firstName lastName')
        .populate({
          path: 'caregiverId',
          populate: { path: 'userId', select: 'firstName lastName' },
        })
        .skip((+page - 1) * +limit)
        .limit(+limit)
        .sort({ createdAt: -1 }),
      this.model.countDocuments(filter),
    ])

    return { data, total, page: +page, limit: +limit, totalPages: Math.ceil(total / +limit) }
  }

  async findOne(id: string) {
    const note = await this.model
      .findById(id)
      .populate('clientId', 'firstName lastName')
      .populate({ path: 'caregiverId', populate: { path: 'userId', select: 'firstName lastName' } })
    if (!note) throw new NotFoundException('Care note not found')
    return note
  }

  async create(dto: any) {
  // Build the document carefully — convert string IDs to ObjectId
  const doc: any = {
    visitDate: dto.visitDate,
    summary: dto.summary,

    // Backward + forward compatible
    observations: dto.observations ?? dto.notes ?? '',

    mood: dto.mood || 'good',

    // Accept both old and new field names
    vitalSigns: dto.vitalSigns ?? dto.vitals ?? {},

    tasksCompleted: dto.tasksCompleted || [],
    medications: dto.medications || [],
    incidents: dto.incidents || [],
    photos: dto.photos || [],
    voiceNoteUrl: dto.voiceNoteUrl,

    familyShared:
      dto.familyShared === true || dto.familyShared === 'true',
  }

  if (dto.clientId && dto.clientId !== '') {
    try {
      doc.clientId = new Types.ObjectId(dto.clientId)
    } catch {}
  }

  if (dto.caregiverId && dto.caregiverId !== '') {
    try {
      doc.caregiverId = new Types.ObjectId(dto.caregiverId)
    } catch {}
  }

  if (dto.scheduleId && dto.scheduleId !== '') {
    try {
      doc.scheduleId = new Types.ObjectId(dto.scheduleId)
    } catch {}
  }

  const note = await this.model.create(doc)

  return this.model
    .findById(note._id)
    .populate('clientId', 'firstName lastName')
    .populate({
      path: 'caregiverId',
      populate: {
        path: 'userId',
        select: 'firstName lastName',
      },
    })
}
  async update(id: string, dto: any) {
    const note = await this.model.findByIdAndUpdate(id, dto, { new: true })
    if (!note) throw new NotFoundException('Care note not found')
    return note
  }

  async remove(id: string) {
    await this.model.findByIdAndDelete(id)
    return { success: true }
  }

  async uploadPhoto(id: string, file: Express.Multer.File) {
    if (!file) throw new NotFoundException('No file provided')
    const base64 = file.buffer.toString('base64')
    const dataUrl = `data:${file.mimetype};base64,${base64}`
    const note = await this.model.findByIdAndUpdate(
      id,
      { $push: { photos: dataUrl } },
      { new: true }
    )
    return note
  }
}