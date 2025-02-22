import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('documents')
export class Document extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  filePath: string;
}
