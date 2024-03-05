import { UnitsStatusModel } from '../entities/units.status.entity';
import { OmitType } from '@nestjs/mapped-types';

export class CreateUnitStatusDto {
  CID: string;
  UID: string;
  MODE: string;
  STATUS: string;
}
