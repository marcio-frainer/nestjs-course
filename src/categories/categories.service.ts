import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/Players.service';
import { CategoryDto } from './dtos/category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectModel('Category') private readonly categoryModel: Model<Category>,
        private readonly playersService: PlayersService) { };

    private readonly logger = new Logger(CategoriesService.name);

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

    async setCategoryPlayer(param: String[]): Promise<void> {
        const category = param['category'];
        const idPlayer = param['idPlayer'];

        const categoryFound = await this.categoryModel.findOne({ category }).exec();
        const playerIsCategory = await this.categoryModel.find({ category }).where('players').in(idPlayer).exec();
        const playerFound = await this.playersService.findOne(idPlayer);

        // this.logger.log(`categoryFinded: ${JSON.stringify(categoryFinded)}`);

        if (!categoryFound) {
            throw new BadRequestException(`Category ${categoryFound} not found!`);
        }

        if (playerIsCategory) {
            throw new BadRequestException(`Player ${idPlayer} already exists in category ${category}!`);
        }

        if (!playerFound) {
            throw new BadRequestException(`Player ${idPlayer} not found!`);
        }

        categoryFound.players.push(idPlayer);
        await this.categoryModel.findOneAndUpdate({ category }, { $set: categoryFound }).exec();
    }
}
