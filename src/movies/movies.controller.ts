import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateMovieDTO } from './dtos/create-movie.dto';
import { EditMovieDTO } from './dtos/edit-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { MoviesService } from './movies.service';

@Controller('movies')
@UseGuards(AuthGuard('jwt'))
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Post()
  async create(@Body() body: CreateMovieDTO) {
    const content = await this.moviesService.create(body);

    return { result: content };
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    const content = await this.moviesService.getOne(id);
    return { result: content };
  }

  @Get('')
  async getMany() {
    const content = await this.moviesService.getMany();
    return { result: content };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const content = await this.moviesService.delete(id);

    return { result: content };
  }

  @Patch(':id')
  async edit(@Param('id') id: string, @Body() body: EditMovieDTO) {
    const content = await this.moviesService.edit(id, body);

    return { result: content };
  }
}
