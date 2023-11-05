import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { EditMovieDTO } from './dtos/edit-movie.dto';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  subtitle: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @Column()
  blurb: string;

  @Column({ type: 'timestamp' })
  releasedAt: Date;

  constructor(
    title: string,
    blurb: string,
    releasedAt: Date,
    subtitle?: string,
    id?: string,
    createdAt?: Date,
  ) {
    this.id = id ?? uuid();
    this.title = title;
    this.blurb = blurb;
    this.createdAt = createdAt ?? new Date();
    this.releasedAt = releasedAt;
    this.subtitle = subtitle ?? null;
  }

  edit(editMovieDTO: EditMovieDTO) {
    this.title = editMovieDTO.title ?? this.title;
    this.subtitle = editMovieDTO.subtitle ?? this.subtitle;
    this.blurb = editMovieDTO.blurb ?? this.blurb;
    this.releasedAt = editMovieDTO.releasedAt ?? this.releasedAt;
  }
}
