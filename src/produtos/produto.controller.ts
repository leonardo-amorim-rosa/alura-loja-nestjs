import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { CreateProductDTO } from "./dto/create-product.dto";

@Controller("/produtos")
export class ProdutoController {

    constructor(private readonly produtoRepository: ProdutoRepository){}

    @Post()
    async criarProduto(@Body() dadosProduto: CreateProductDTO) {
       this.produtoRepository.criarProduto(dadosProduto); 
       return { status: 'Produto criado com sucesso!', produto: dadosProduto }
    }

    @Get()
    async listarProdutos() {
        return this.produtoRepository.listarProdutos();
    }

}