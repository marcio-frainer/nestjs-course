import { IsEmail, IsNotEmpty } from 'class-validator';

export class JogadorDto {

    @IsNotEmpty()
    readonly telefoneCelular: string;
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    readonly nome: string;

}