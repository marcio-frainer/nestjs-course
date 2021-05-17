import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dtos/category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './interfaces/category.interface';

@Controller('api/v1/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { };

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() categoryDto: CategoryDto): Promise<void> {
        return await this.categoriesService.create(categoryDto);
    }

    @Put("/:category")
    async update(
        @Param('category') category: string,
        @Body() categoryDto: UpdateCategoryDto): Promise<void> {
        await this.categoriesService.update(category, categoryDto);
    }

    @Get()
    async findAll(): Promise<Array<Category>> {
        return await this.categoriesService.findAll();
    }

    @Get('/:category')
    async findOne(@Param('category') category: string): Promise<Category> {
        return await this.categoriesService.findOne(category);
    }

}