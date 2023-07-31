import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailEhUnico } from "../validation/email-eh-unico.validator";

export class UpdateUserDTO {

    @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
    @IsOptional()
    nome: string;

    @IsEmail(undefined, { message: 'O email não é válido.' })
    @EmailEhUnico({ message: 'Já existe um usuário com este e-mail' })
    @IsOptional()
    email: string;

    @MinLength(6, { message: 'A senha deve ter pelo menos 6 digitos.' })
    @IsOptional()
    senha: string;
}