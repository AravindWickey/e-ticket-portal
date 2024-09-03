import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from './movies.entity';
import { memoryStorage } from 'multer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movies]),
    ConfigModule,
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
