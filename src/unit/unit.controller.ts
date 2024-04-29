import { Controller, Get, Param } from '@nestjs/common';
import { UnitService } from './unit.service';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  /**
   * 컨트롤러에 해당하는 유닛 settings 가져오기
   */
  @Get('setting/:CID')
  getUnitSettings(@Param('CID') CID: string) {
    return this.unitService.findLatestUnitSettings(CID);
  }

  /**
   * 컨트롤러에 해당하는 유닛 statuses 가져오기
   */
  @Get('statuses/:CID')
  getUnitStatuses(@Param('CID') CID: string) {
    return this.unitService.findLatestUnitStatuses(CID);
  }
}
