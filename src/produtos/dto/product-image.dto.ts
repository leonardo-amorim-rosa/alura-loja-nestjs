import { IsNotEmpty } from "class-validator";

export class ProductImageDTO {
    @IsNotEmpty()
    url: string;
    
    @IsNotEmpty()
    descricao: string;
  }