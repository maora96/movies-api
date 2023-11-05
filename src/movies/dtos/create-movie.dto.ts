import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMovieDTO {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  subtitle: string;

  @IsNotEmpty()
  blurb: string;

  @IsNotEmpty()
  releasedAt: Date;
}
