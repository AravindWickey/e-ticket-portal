import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Movies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  duration: string;

  @Column({ type: 'text' })
  description: string;

  @Column('decimal')
  unitPrice: number;

  @Column('int', { default: 0 })
  tickets: number;

  @Column({ nullable: true })
  filePath: string;

  @Column()
  category: string;
}
