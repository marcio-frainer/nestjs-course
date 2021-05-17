import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';

export interface Category extends Document {
    readonly category: string;
    description: string;
    events: Array<Event>;
}

export interface Event {
    name: string;
    operation: string;
    value: number;
}