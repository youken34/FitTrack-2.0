import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { WeightHistory } from './entities/weight-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, WeightHistory])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
