import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto } from './dtos/category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) { };

    async create(categoryDto: CategoryDto): Promise<void> {
        const { category } = categoryDto;
        const findedCategory = await this.categoryModel.findOne({ category }).exec();
        if (findedCategory) {
            throw new BadRequestException(`Category ${category} already exists!`);
        }

        const categoryCreated = new this.categoryModel(categoryDto);
        await categoryCreated.save();
    }

    async update(category: string, updateCategoryDto: UpdateCategoryDto): Promise<void> {
        const findedCategory = this.findOne(category);
        if (!findedCategory) {
            throw new NotFoundException(`Category ${category} not found!`);
        }
        this.categoryModel.findOneAndUpdate({ category }, { $set: updateCategoryDto }).exec();
    }

    async findAll(): Promise<Array<Category>> {
        return this.categoryModel.find().exec();
    }

    async findOne(category: string): Promise<Category> {
        return this.categoryModel.findOne({ category });
    }
}
