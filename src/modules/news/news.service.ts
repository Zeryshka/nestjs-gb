import { News } from '../../dto/news.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

const news: News[] = [
  {
    id: 0,
    title: 'Котики',
    description:
      'В мире котиков существует один самый красивый котик и его зовут Вася...',
    author: 'Котик Вася',
    createdAt: new Date(Date.now()),
    comments: [
      { id: 0, text: 'Крутотень!', createdAt: new Date(Date.now()) },
      { id: 1, text: 'Вааау!', createdAt: new Date(Date.now()) },
    ],
  },
];

@Injectable()
export class NewsService {
  async get(id?: number): Promise<News | News[] | HttpException> {
    if (id === undefined) {
      return news;
    }

    if (news[id]) {
      return news[id];
    }

    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Запись с id ${id} не найдена`,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async create(data: News): Promise<News[]> {
    data.id = news.length;
    data.createdAt = new Date(Date.now());
    news.push(data);
    return news;
  }

  async update(id: number, data: News): Promise<News[]> {
    if (news[id]) {
      news[id] = {
        ...news[id],
        ...data,
      };
      return news;
    }

    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Запись с id ${id} не найдена`,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async delete(id: number): Promise<News[]> {
    news.splice(id, 1);
    return news;
  }
}
