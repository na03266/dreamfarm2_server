import { Module } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpController } from './http.controller';
import { HttpService } from "./http.service";

@Module({
  imports: [
    AppModule, //mqtt 모듈
  ],
  controllers: [HttpController],
  providers: [HttpService],
  exports:[HttpService]
})
export class HttpModule {}
