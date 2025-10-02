import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { WeightHistory } from './entities/weight-history.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(WeightHistory)
    private weightHistoryRepository: Repository<WeightHistory>,
  ) {}

  async addWeight(userId: string, weight: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['weightHistory'],
    });
    if (!user) {
      throw new Error('User not found');
    }
    const history = this.weightHistoryRepository.create({ weight, user });
    await this.weightHistoryRepository.save(history);
    return history;
  }
}
