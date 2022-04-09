import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CommentsController } from './controllers/comments.controller';
import { NewsController } from './controllers/news.controller';
import { CommentsModule } from './modules/comments/comments.module';
import { NewsModule } from './modules/news/news.module';

@Module({
  imports: [
    CommentsModule,
    NewsModule,
    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [CommentsController, NewsController],
})
export class AppModule {}
