import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Categoria } from './entities/categoria.entity';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  create(@Body() categoria: Categoria) {
    return this.categoriaService.create(categoria);
  }

  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.categoriaService.findById(Number(id));
  }
  @Get('/nome/:nome')
  findByNome(@Param('nome') nome: string) {
  return this.categoriaService.findByNome(nome);
}

  @Put()
  update(@Body() categoria: Categoria) {
  return this.categoriaService.update(categoria);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaService.delete(Number(id));
  }
}
