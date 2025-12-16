import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { Produto } from '../entities/produto.entity';
import { ProdutoService } from '../service/produto.service';

@Controller('produtos')
export class ProdutoController {

  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: Produto) {
    return this.produtoService.create(produto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.produtoService.findById(Number(id));
  }
  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nome') nome: string) {
    return this.produtoService.findByNome(nome);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
  @Param('id') id: string,
  @Body() produto: Produto
  ) {
    produto.id = Number(id);
    return this.produtoService.update(produto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.produtoService.delete(Number(id));
  }
}
