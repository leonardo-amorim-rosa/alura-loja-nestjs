import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsPositive, IsUUID, MaxLength, MinLength, ValidateNested } from "class-validator";
import { ProductCharacteristicsDTO } from "./product-characteristics.dto";
import { ProductImageDTO } from "./product-image.dto";
import { Type } from "class-transformer";

export class CreateProductDTO {
  @IsUUID(undefined, { message: 'ID do usuário inválido' })
  usuarioId: string;

  @IsNotEmpty()
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  valor: number;

  @IsNumber()
  quantidade: number;

  @MinLength(1)
  @MaxLength(1000)
  descricao: string;

  @ArrayMinSize(3)
  @ValidateNested()
  @IsArray()
  @Type(() => ProductCharacteristicsDTO)
  caracteristicas: ProductCharacteristicsDTO[];

  @ArrayMinSize(1)
  @ValidateNested()
  @IsArray()
  @Type(() => ProductImageDTO)
  imagens: ProductImageDTO[];

  @IsNotEmpty()
  categoria: string;

  @IsNotEmpty()
  dataCriacao: string;

  @IsNotEmpty()
  dataAtualizacao: string;
}