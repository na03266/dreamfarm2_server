export class CreateControllersSettingDto {
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

export class SendControllerSettingDto{
  CTRL_SETTING:{
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
}