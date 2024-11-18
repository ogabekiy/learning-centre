import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { AuthGuard } from 'src/common/guards/authGuard';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [AuthsController],
  providers: [AuthsService],
  exports: [AuthsService]
})
export class AuthsModule {}
