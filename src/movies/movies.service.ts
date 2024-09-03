import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movies } from './movies.entity';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movies)
    private movieRepository: Repository<Movies>,
    private configService: ConfigService
  ) {}

  async create(moviesData: any, file: Express.Multer.File): Promise<Movies> {
    let existingMovie: Movies | null = null;
  
    if (moviesData.id) {
      existingMovie = await this.movieRepository.findOne({ where: { id: moviesData.id } });
    }
  
    if (file && file.buffer) {
      const fileName = `${uuidv4()}-${file.originalname}`;
      const filePath = path.join(__dirname, '../../uploads', fileName);
      fs.writeFileSync(filePath, file.buffer);
      moviesData.filePath = fileName;
    }
  
    if (existingMovie) {
      Object.assign(existingMovie, moviesData);
      return this.movieRepository.save(existingMovie);
    } else {
      const newMovie = this.movieRepository.create(moviesData);
      return this.movieRepository.save(newMovie) as unknown as Promise<Movies>;
    }
  }   
  
  async findAll(): Promise<Movies[]> {
    const movies = await this.movieRepository.find();
    console.log('Movies:', movies); 
    const baseUrl = this.configService.get<string>('BASE_URL') || 'http://localhost:3001';
    return movies.map(movie => ({
      ...movie,
      filePath: `${baseUrl}/uploads/${movie.filePath}`
    }));
  }
  }

