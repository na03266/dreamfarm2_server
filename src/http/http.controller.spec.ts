import { Test, TestingModule } from '@nestjs/testing';
import { HttpController } from './http.controller';
import { HttpService } from './http.service';

describe('HttpController', () => {
  let controller: HttpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HttpController],
      providers: [HttpService],
    }).compile();

    controller = module.get<HttpController>(HttpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
