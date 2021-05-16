import { Body, Controller, Get, Param, Post, Logger, Query, Delete, UsePipes, ValidationPipe, Put } from '@nestjs/common';
import { PlayerDto } from './dtos/Player.dto'
import { Player } from './interfaces/Player.interface';
import { PlayersService } from './Players.service';
import { PlayersValidationParamsPipe } from './pipes/players-validation-params.pipe';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly PlayersService: PlayersService) { };

    private readonly logger = new Logger(PlayersController.name);

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() player: PlayerDto) {
        await this.PlayersService.create(player);
    }

    @Put(':_id')
    @UsePipes(ValidationPipe)
    async update(
        @Body() player: PlayerDto,
        @Param('_id', PlayersValidationParamsPipe) _id: string): Promise<void> {
        await this.PlayersService.update(_id, player);
    }

    @Get()
    async findAll(): Promise<Player[]> {
        return this.PlayersService.findAll();
    }

    @Get('/:_id')
    async findOne(@Param('_id', PlayersValidationParamsPipe) _id: string): Promise<Player> {
        this.logger.log(`findOne: ${_id}`);
        return this.PlayersService.findOne(_id);
    }

    @Delete('/:_id')
    async delete(@Param('_id', PlayersValidationParamsPipe) _id: string): Promise<void> {
        return await this.PlayersService.delete(_id);
    }

}
