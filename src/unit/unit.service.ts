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
   * 유닛의 자료형을 받아서 그대로 DB에 저장해줌
   * 배열로 받은것을 각각 넣어줘야함.
   * @param unitsStatuses
   */
  async saveUnitStatuses(unitsStatuses: UpdateUnitStatusDto) {
    const unitsStatus = this.unitsStatusRepository.create({
      UID: unitsStatuses.UID,
      CID: unitsStatuses.CID,
      MODE: unitsStatuses.MODE,
      STATUS: unitsStatuses.STATUS,
    });
    const newUnitStatus = await this.unitsStatusRepository.save(unitsStatus);

    return newUnitStatus;
  }
}
