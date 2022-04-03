import { Module } from '@nestjs/common';
import { AppController, CalculatorController } from './app.controller';
import { AppService, AppCalculator } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, CalculatorController],
  providers: [AppService, AppCalculator],
})
export class AppModule {}
