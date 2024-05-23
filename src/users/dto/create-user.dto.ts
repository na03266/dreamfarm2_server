import { IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { RolesEnum } from '../const/roles.const';

export class CreateUserDto {
  userId: string;

  password: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsPhoneNumber(null)
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEnum(RolesEnum)
  role?: RolesEnum;

  @IsOptional()
  @IsString()
  upperManager?: string;
}
