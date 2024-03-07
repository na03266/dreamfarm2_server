import { Controller, Get, Param } from '@nestjs/common';
import { UnitService } from './unit.service';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  /**
   * 컨트롤러에 해당하는 유닛 세팅 가져오기
   */
  @Get('setting/:CID')
  getUnitSettings(@Param('CID') CID: string) {
    console.log(this.unitService.findLatestUnitSettings(CID));
    return this.unitService.findLatestUnitSettings(CID);
  }

  @Get('statuses/:CID')
  getUnitStatuses(@Param('CID') CID: string) {
    // return this.unitService.tfindLatestUnitStatus(CID);
  }
}
