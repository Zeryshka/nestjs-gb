import { Comments } from './comments.dto';

export class News {
  id!: number;
  title!: string;
  description!: string;
  author!: string;
  createdAt!: Date;
  comments!: Comments[];
}
