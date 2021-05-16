import { Injectable, Logger } from '@nestjs/common';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayerDto } from './dtos/player.dto';

@Injectable()
export class PlayersService {

    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) { };

    private readonly logger = new Logger(PlayersService.name);

    public async create(player: PlayerDto): Promise<void> {
        this.createPlayer(player);
    }

    public async findAll(): Promise<Player[]> {
        return this.playerModel.find().exec();
    }

    public async findOne(email: string): Promise<Player> {
        return this.playerModel.findOne({ email }).exec();
    }

    public async delete(email: string): Promise<void> {
        this.playerModel.deleteOne({ email }).exec();
    }

    private async createPlayer(playerDto: PlayerDto): Promise<Player> {
        const player = new this.playerModel(playerDto);
        return await player.save();
    }

}
