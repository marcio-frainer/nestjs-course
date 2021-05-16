import { IsEmail, IsNotEmpty } from 'class-validator';

export class PlayerDto {

    @IsNotEmpty()
    readonly cellPhone: string;
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    readonly name: string;

}