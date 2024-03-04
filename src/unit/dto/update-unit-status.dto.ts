import { UnitsStatusModel } from '../entities/units.status.entity';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateUnitStatusDto extends OmitType(UnitsStatusModel, [
  'id',
  'logTime',
]) {}
