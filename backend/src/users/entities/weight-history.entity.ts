import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class WeightHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  weight: number;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => User, (user) => user.weightHistory)
  user: User;
}
