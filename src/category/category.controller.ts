
import { Get, Param, Post, Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';


@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Category> {
        return this.categoryService.findOne(+id);
    }

    @Post()
    async create(@Body('name') name: string): Promise<Category> {
        return this.categoryService.create(name);
    }
}
