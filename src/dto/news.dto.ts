import { IsArray, IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { Comments } from './comments.dto';

export class News {
  @IsInt()
  @IsOptional()
  id?: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  author: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @IsArray()
  @IsOptional()
  comments?: Comments[];
}
