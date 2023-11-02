import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Название поста',
  })
  title: string;

  @ApiProperty({
    description: 'Описание поста',
  })
  description: string;

  @ApiProperty({
    description: 'ID категории',
    minimum: 1,
  })
  categoryId: number;
}
