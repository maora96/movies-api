import { IsOptional } from 'class-validator';

export class EditMovieDTO {
  @IsOptional()
  title: string;

  @IsOptional()
  subtitle: string;

  @IsOptional()
  blurb: string;

  @IsOptional()
  releasedAt: Date;
}
