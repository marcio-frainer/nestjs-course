import { Body, Controller, Get, Param, Post, Logger, Query, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { JogadorDto } from './dtos/jogador.dto'
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidationParamPipe } from './pipes/jogadores-validacao-param.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) { };

    // private readonly logger = new Logger(JogadoresService.name);

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() jogador: JogadorDto) {
        await this.jogadoresService.create(jogador);
    }

    @Get()
    async findOne(@Query('email') email: string): Promise<Jogador[] | Jogador> {
        if (email) {
            return this.jogadoresService.findOne(email);
        }

        return this.jogadoresService.findAll();
    }

    @Delete()
    async delete(@Query('email', JogadoresValidationParamPipe) email: string): Promise<void> {
        return await this.jogadoresService.delete(email);
    }

}
