import { IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { RolesEnum } from '../const/roles.const';

export class AdminFunctionDto {
  role?: string;
  superior?: string;
  keyword?: string;
}
