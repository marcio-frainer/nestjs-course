import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayerDto } from './dtos/player.dto';

@Injectable()
export class PlayersService {

    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) { };

    private readonly logger = new Logger(PlayersService.name);

    public async create(player: PlayerDto): Promise<void> {
        const { email } = player;
        const findedPlayer = this.findEmail(email);
        if (findedPlayer) {
            throw new BadRequestException(`Player with email: ${email} already exists!`);
        }
        this.createPlayer(player);
    }

    public async update(_id: string, player: PlayerDto): Promise<void> {
        const findedPlayer = this.findOne(_id);
        if (!findedPlayer) {
            throw new NotFoundException(`Player ${_id} not found!`);
        }
        this.playerModel.findOneAndUpdate({ _id }, { $set: player }).exec();
    }

    public async findAll(): Promise<Player[]> {
        return this.playerModel.find().exec();
    }

    public async findEmail(email: string): Promise<Player> {
        return this.playerModel.findOne({ email }).exec();
    }

    public async findOne(_id: string): Promise<Player> {
        return this.playerModel.findOne({ _id }).exec();
    }

    public async delete(_id: string): Promise<void> {
        this.playerModel.deleteOne({ _id }).exec();
    }

    private async createPlayer(playerDto: PlayerDto): Promise<Player> {
        const player = new this.playerModel(playerDto);
        return await player.save();
    }

}
