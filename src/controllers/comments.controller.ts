import { Comments } from '../dto/comments.dto';
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
import { CommentsService } from '../modules/comments/comments.service';
import { News } from 'src/dto/news.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('get')
  async get(
    @Query('id') id: number,
  ): Promise<HttpException | Comments[] | News[]> {
    return this.commentsService.get(id);
  }

  @Put('create')
  async create(
    @Query('id') id: number,
    @Body() body: Comments,
  ): Promise<News | HttpException> {
    return this.commentsService.create(id, body);
  }

  @Post('update')
  async update(
    @Query('id') id: number,
    @Query('commentID') commentID: number,
    @Body() body: Comments,
  ): Promise<News | HttpException> {
    return this.commentsService.update(id, commentID, body);
  }

  @Delete('delete')
  async delete(
    @Query('id') id: number,
    @Query('commentID') commentID: number,
  ): Promise<News | HttpException> {
    return this.commentsService.delete(id, commentID);
  }
}
