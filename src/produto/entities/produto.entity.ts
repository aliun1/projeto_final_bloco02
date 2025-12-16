import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity({ name: 'tb_produtos' })
export class Produto {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  preco: number;

  @Column({ nullable: false })
  estoque: number;

  @ManyToOne(() => Categoria, {
    eager: true,
    onDelete: 'CASCADE',
  })
  categoria: Categoria;
}
