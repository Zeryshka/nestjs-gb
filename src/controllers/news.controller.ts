import { News } from '../dto/news.dto';
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
import { NewsService } from '../modules/news/news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('get')
  async get(@Query('id') id: number): Promise<News | News[] | HttpException> {
    return this.newsService.get(id);
  }

  @Put('create')
  async createNews(@Body() body: News): Promise<News[]> {
    return this.newsService.create(body);
  }

  @Post('update')
  async updateNews(
    @Query() queary: { id: number },
    @Body() body: News,
  ): Promise<News[]> {
    return this.newsService.update(queary.id, body);
  }

  @Delete('delete')
  async deleteNews(@Query() queary: { id: number }): Promise<News[]> {
    return this.newsService.delete(queary.id);
  }
}
