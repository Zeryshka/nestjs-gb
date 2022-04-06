import { IsNumber, IsOptional, IsString, IsDate } from 'class-validator';
export class Comments {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  text: string;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsOptional()
  attachments: string[];
}
