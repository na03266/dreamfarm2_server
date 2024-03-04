import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitsStatusModel } from './entities/units.status.entity';
import { UpdateUnitStatusDto } from './dto/update-unit-status.dto';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitsStatusModel)
    private readonly unitsStatusRepository: Repository<UnitsStatusModel>,
  ) {}

  /**
   * 유닛 상태 업데이트
   * @param unitsStatuses
   */
  async saveUnitStatuses(unitsStatuses: UpdateUnitStatusDto) {
    const unitsStatus = this.unitsStatusRepository.create({
      ...unitsStatuses
    });
    const newUnitStatus = await this.unitsStatusRepository.save(unitsStatus);
    
    return newUnitStatus;
  }
}
