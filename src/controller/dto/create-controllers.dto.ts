import { UsersModel } from '../../users/entities/users.entity';

export class CreateControllersDto {
  CID: string;
  SETTEMP?: string;
  TEMPGAP?: string;
  HEATTEMP?: string;
  ICETYPE?: string;
  ALARMTYPE?: string;
  ALRAMTEMPH?: string;
  ALRAMTMEPL?: string;
  TEL?: string;
  AWS?: string;
}

export class ControllerToUserDto {
  CID: string;
  userId: string;
}
