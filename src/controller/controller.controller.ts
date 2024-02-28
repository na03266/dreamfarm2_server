import { Controller } from '@nestjs/common';
import { ControllerService } from './controller.service';

@Controller('controller')
export class ControllerController {
  constructor(private readonly controllerService: ControllerService) {}
}
