import { Injectable, Logger } from '@nestjs/common';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadorDto } from './dtos/jogador.dto';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { };

    private readonly logger = new Logger(JogadoresService.name);

    public async create(jogador: JogadorDto): Promise<void> {
        this.createPlayer(jogador);
    }

    public async findAll(): Promise<Jogador[]> {
        return this.jogadorModel.find().exec();
    }

    public async findOne(email: string): Promise<Jogador> {
        return this.jogadorModel.findOne({ email }).exec();
    }

    public async delete(email: string): Promise<void> {
        this.jogadorModel.deleteOne({ email }).exec();
    }

    private async createPlayer(jogadorDto: JogadorDto): Promise<Jogador> {
        const player = new this.jogadorModel(jogadorDto);
        return await player.save();
    }

}
