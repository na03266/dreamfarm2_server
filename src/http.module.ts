import { Module } from "@nestjs/common";
import { AppModule } from "./app.module";
import { HttpController } from "./http.controller";


@Module({
  imports: [
    AppModule  //mqtt 모듈
  ],
  controllers: [HttpController],
  providers: [],
})
export class HttpModule {}