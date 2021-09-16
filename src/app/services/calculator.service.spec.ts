import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

class FakeLoggerService {
  log() {}
}

const fakeObj = {
  log() {},
};

const serviceMock = {
  log: jest.fn(),
};

describe('Calculator Service', () => {
  let calculatorService: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        // {
        //   provide: 'LoggerService',
        //   useClass: FakeLoggerService
        // }
        {
          provide: 'LoggerService',
          useValue: serviceMock,
        },
      ],
    });

    // calculatorService = TestBed.inject(CalculatorService);
    //calculatorService = new CalculatorService(new LoggerService())
    calculatorService = new CalculatorService(new FakeLoggerService())
    calculatorService = new CalculatorService(fakeObj as LoggerService)
    calculatorService = new CalculatorService(serviceMock)
  });

  it('shouls add two numbers', () => {
    const result = calculatorService.add(2, 2);
    expect(result).toBe(4);
    // expect(serviceMock.log).toHaveBeenCalled()
  });

  it('should substract two numbers', () => {
    const result = calculatorService.subtract(2, 2);
    expect(result).toBe(0);
  });
});
