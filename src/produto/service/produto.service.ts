import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, DeleteResult } from 'typeorm';
import { Produto } from '../entities/produto.entity';

@Injectable()
export class ProdutoService {

  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

// Buscar todos os produtos
  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  // Buscar produto por ID
  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: {
        categoria: true,
      },
    });

    if (!produto) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }

    return produto;
  }

  // Buscar produto por nome
  async findByNome(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        categoria: true,
      },
    });
  }

  // Criar novo produto
  async create(produto: Produto): Promise<Produto> {

    if (!produto.categoria) {
      throw new HttpException(
        'Categoria inválida. Informe uma categoria existente.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.produtoRepository.save(produto);
  }

  // Atualizar o produto
  async update(produto: Produto): Promise<Produto> {

    if (!produto.id) {
      throw new HttpException('ID do produto é obrigatório', HttpStatus.BAD_REQUEST);
    }

    await this.findById(produto.id);

    return await this.produtoRepository.save(produto);
  }

  // Excluir o produto
  async delete(id: number): Promise<DeleteResult> {

    await this.findById(id);

    return await this.produtoRepository.delete(id);
  }
}
