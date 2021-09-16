import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private readonly logger: LoggerService) {}

  add(n1: number, n2:number) {
    this.logger.log("Addition operation called")
    return n1 + n2;
  }

  subtract(n1: number, n2:number) {
    console.log("Subtraction operation called");
    return n1 - n2;
  }
}

