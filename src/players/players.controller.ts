import { Body, Controller, Get, Param, Post, Logger, Query, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlayerDto } from './dtos/Player.dto'
import { Player } from './interfaces/Player.interface';
import { PlayersService } from './Players.service';
import { PlayersValidationParamsPipe } from './pipes/players-validation-params.pipe';

@Controller('api/v1/Playeres')
export class PlayersController {

    constructor(private readonly PlayersService: PlayersService) { };

    // private readonly logger = new Logger(PlayeresService.name);

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() Player: PlayerDto) {
        await this.PlayersService.create(Player);
    }

    @Get()
    async findOne(@Query('email') email: string): Promise<Player[] | Player> {
        if (email) {
            return this.PlayersService.findOne(email);
        }

        return this.PlayersService.findAll();
    }

    @Delete()
    async delete(@Query('email', PlayersValidationParamsPipe) email: string): Promise<void> {
        return await this.PlayersService.delete(email);
    }

}
