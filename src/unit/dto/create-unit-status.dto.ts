import { UnitsStatusModel } from '../entities/units.status.entity';
import { OmitType } from '@nestjs/mapped-types';

export class CreateUnitStatusDto extends OmitType(UnitsStatusModel, [
  'id',
  'logTime',
]) {}
