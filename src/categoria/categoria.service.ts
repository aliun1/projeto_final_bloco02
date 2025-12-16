import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';


@Injectable()
export class CategoriaService {

  constructor(
@InjectRepository(Categoria)
private categoriaRepository: Repository<Categoria>, 
  ){}

  findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  findById(id: number): Promise<Categoria | null>{
    return this.categoriaRepository.findOneBy({id});
  }
  
  findByNome(nome: string): Promise<Categoria[]> {
  return this.categoriaRepository
      .createQueryBuilder('categoria')
      .where('LOWER(categoria.nome) LIKE LOWER(:nome)', { nome: `%${nome}%` })
      .getMany();
  }
  create(categoria: Categoria): Promise<Categoria> {
    return this.categoriaRepository.save(categoria);  
  }
   
  update(categoria: Categoria): Promise<Categoria> {
    return this.categoriaRepository.save(categoria);
  }

  delete(id: number) {
    return this.categoriaRepository.delete(id); 
  }
}
  