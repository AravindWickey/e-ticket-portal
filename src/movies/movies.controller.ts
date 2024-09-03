import { Controller, Post, UseInterceptors, UploadedFile, Body, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Movies } from './movies.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() moviesData: any) {
    return this.moviesService.create(moviesData, file);
  }

  @Get('get')
  async getAllMovies(): Promise<Movies[]> {
    return this.moviesService.findAll();
  }
}
