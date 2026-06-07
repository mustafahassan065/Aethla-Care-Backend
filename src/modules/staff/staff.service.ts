import { Injectable } from '@nestjs/common'
import { CaregiversService } from '../caregivers/caregivers.service'
@Injectable()
export class StaffService {
  constructor(private caregiversService: CaregiversService) {}
  async findAll(query: any) { return this.caregiversService.findAll(query) }
  async getOnDuty() { return this.caregiversService.findAll({ status: 'active', limit: '100' }) }
}
