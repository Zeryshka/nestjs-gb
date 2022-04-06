import { Comments } from '../../dto/comments.dto';
import { News } from 'src/dto/news.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NewsService } from '../news/news.service';
import { isArray } from 'util';

@Injectable()
export class CommentsService {
  constructor(private readonly newsService: NewsService) {}

  async get(newsID: number): Promise<News[] | Comments[] | HttpException> {
    const news = await this.newsService.get(newsID);

    if (news instanceof HttpException) {
      throw new HttpException(
        `Запись с id ${newsID} не найдена`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (isArray(news)) {
      return news;
    }

    if (Object.keys(news).includes('comments')) {
      return news.comments;
    }
  }

  async create(newsID: number, data: Comments): Promise<News | HttpException> {
    const news = await this.newsService.get(newsID);

    if (
      isArray(news) ||
      news instanceof HttpException ||
      newsID < 0 ||
      newsID === undefined
    ) {
      throw new HttpException(
        `Запись с id ${newsID} не найдена`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (Object.keys(news).includes('comments')) {
      data.id = news.comments.length;
      data.createdAt = new Date(Date.now());
      news.comments.push(data);
      return news;
    }
  }

  async update(
    newsID: number,
    commentID: number,
    data: Comments,
  ): Promise<News | HttpException> {
    const news = await this.newsService.get(newsID);

    if (
      isArray(news) ||
      news instanceof HttpException ||
      newsID < 0 ||
      newsID === undefined
    ) {
      throw new HttpException(
        `Запись с id ${newsID} не найдена`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (
      Object.keys(news).includes('comments') &&
      news.comments[commentID] === undefined
    ) {
      throw new HttpException(
        `Комментарий с id ${commentID} не найден`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    news.comments[commentID].text = data.text;
    return news;
  }

  async delete(
    newsID: number,
    commentID: number,
  ): Promise<News | HttpException> {
    const news = await this.newsService.get(newsID);

    if (
      isArray(news) ||
      news instanceof HttpException ||
      newsID < 0 ||
      newsID === undefined
    ) {
      throw new HttpException(
        `Запись с id ${newsID} не найдена`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (
      Object.keys(news).includes('comments') &&
      news.comments[commentID] === undefined
    ) {
      throw new HttpException(
        `Комментарий с id ${commentID} не найден`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    news.comments.splice(commentID, 1);
    return news;
  }
}
