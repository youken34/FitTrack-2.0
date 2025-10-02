import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { WeightHistory } from './weight-history.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // équivalent à _id MongoDB

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('int')
  weight: number;

  @Column('int')
  targetWeight: number;

  @OneToMany(() => WeightHistory, (history) => history.user, { cascade: true })
  weightHistory: WeightHistory[];
}
