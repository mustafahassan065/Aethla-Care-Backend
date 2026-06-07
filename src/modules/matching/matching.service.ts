import { Injectable } from '@nestjs/common'
import { CaregiversService } from '../caregivers/caregivers.service'
@Injectable()
export class MatchingService {
  constructor(private caregiversService: CaregiversService) {}
  async match(criteria: any) { return this.caregiversService.matchCaregiver(criteria) }
}
