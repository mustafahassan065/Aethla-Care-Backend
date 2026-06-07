import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CareNotesController } from './care-notes.controller'
import { CareNotesService } from './care-notes.service'
import { CareNote, CareNoteSchema } from './schemas/care-note.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: CareNote.name, schema: CareNoteSchema }])],
  controllers: [CareNotesController],
  providers: [CareNotesService],
  exports: [CareNotesService],
})
export class CareNotesModule {}
