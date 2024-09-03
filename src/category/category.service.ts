import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
      ) {}

      async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
      }
    
      async findOne(id: number): Promise<Category> {
        return this.categoryRepository.findOneBy({ id });
      }
    
      async create(name: string): Promise<Category> {
        const category = this.categoryRepository.create({ name });
        return this.categoryRepository.save(category);
      }
}
