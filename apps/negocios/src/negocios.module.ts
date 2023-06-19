import { Module } from '@nestjs/common';
import { NegociosController } from './negocios.controller';
import { NegociosService } from './negocios.service';
import { LoginModule } from 'apps/login/src/login.module';

@Module({
  imports: [LoginModule],
  controllers: [NegociosController],
  providers: [NegociosService],
})
export class NegociosModule {}
