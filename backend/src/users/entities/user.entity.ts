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

  @Column({ type: 'float', default: 0 })
  weight: number;

  @Column({ type: 'float', default: 0 })
  targetWeight: number;

  @OneToMany(() => WeightHistory, (history) => history.user, { cascade: true })
  weightHistory: WeightHistory[];
}
