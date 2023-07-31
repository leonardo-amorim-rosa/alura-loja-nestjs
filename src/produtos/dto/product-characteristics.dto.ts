import { IsNotEmpty } from "class-validator";

export class ProductCharacteristicsDTO {
    @IsNotEmpty()
    nome: string;
    
    @IsNotEmpty()
    descricao: string;
  }