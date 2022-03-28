import { News } from './dto/news.dto';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  HttpException,
} from '@nestjs/common';
import { AppService, AppCalculator } from './app.service';

@Controller('news')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get')
  async get(@Query('id') id: number): Promise<HttpException | News> {
    return this.appService.get(id);
  }

  @Get('getAll')
  async getAll(): Promise<News[]> {
    return this.appService.getAll();
  }

  @Put('create')
  async createNews(@Body() body: News): Promise<News[]> {
    return this.appService.createNews(body);
  }

  @Post('update')
  async updateNews(
    @Query() queary: { id: number },
    @Body() body: News,
  ): Promise<News[]> {
    return this.appService.updateNews(queary.id, body);
  }

  @Delete('delete')
  async deleteNews(@Query() queary: { id: number }): Promise<News[]> {
    return this.appService.deleteNews(queary.id);
  }
}

// localhost:3000/calculator/plus
// body: [1,2,3]
// response: 6
@Controller('calculator')
export class CalculatorController {
  constructor(private readonly appCalculator: AppCalculator) {}

  @Post('plus')
  async plus(@Body() body: number[]): Promise<number> {
    return this.appCalculator.plus(body);
  }
}
