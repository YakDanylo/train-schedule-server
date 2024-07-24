import { Module } from '@nestjs/common';
import { TrainController } from './train.controller';
import { TrainService } from './train.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Train } from './train.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Train])],
  controllers: [TrainController],
  providers: [
    TrainService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class TrainModule {}
