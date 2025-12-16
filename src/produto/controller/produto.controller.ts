import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { Produto } from '../entities/produto.entity';
import { ProdutoService } from '../service/produto.service';

@Controller('produtos')
export class ProdutoController {

  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  create(@Body() produto: Produto) {
    return this.produtoService.create(produto);
  }

  @Get()
  findAll() {
    return this.produtoService.findAll();
  }

  @Get('/nome/:nome')
  findByNome(@Param('nome') nome: string) {
    return this.produtoService.findByNome(nome);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.produtoService.findById(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() produto: Produto
  ) {
    produto.id = Number(id);
    return this.produtoService.update(produto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.delete(Number(id));
  }
}
