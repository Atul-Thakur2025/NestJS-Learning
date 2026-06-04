import { Test, TestingModule } from '@nestjs/testing';
import { MassegeFormaterService } from './massege-formater.service';

describe('MassegeFormaterService', () => {
  let service: MassegeFormaterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MassegeFormaterService],
    }).compile();

    service = module.get<MassegeFormaterService>(MassegeFormaterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
