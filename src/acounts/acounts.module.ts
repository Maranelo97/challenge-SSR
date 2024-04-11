import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcountsEntity } from './entities/acounts.entity';
import { AcountService } from './services/acounts.service';
import { AcountsController } from './controllers/acounts.controllers';

@Module({
    imports: [TypeOrmModule.forFeature([AcountsEntity])],
    providers: [AcountService],
    controllers: [AcountsController]
})
export class AcountsModule {}
