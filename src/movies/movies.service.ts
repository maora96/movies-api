import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDTO } from './dtos/create-movie.dto';
import { EditMovieDTO } from './dtos/edit-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private moviesRepository: Repository<Movie>,
  ) {}

  async create(createMovieDTO: CreateMovieDTO) {
    const { title, blurb, releasedAt, subtitle } = createMovieDTO;

    const movie = new Movie(title, blurb, releasedAt, subtitle);

    console.log('hey', movie);

    return this.moviesRepository.save(movie);
  }

  async getOne(id: string) {
    const movie = await this.moviesRepository.findOne({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('User not found');
    }

    return movie;
  }

  async getMany() {
    return await this.moviesRepository.find();
  }

  async delete(id: string) {
    const movie = await this.moviesRepository.findOne({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('Filme não encontrado');
    }
    return this.moviesRepository.remove(movie);
  }

  async edit(id: string, editMovieDTO: EditMovieDTO) {
    const movie = await this.moviesRepository.findOne({
      where: { id },
    });

    if (!movie) {
      throw new NotFoundException('Filme não encontrado.');
    }

    movie.edit(editMovieDTO);

    return this.moviesRepository.save(movie);
  }
}
