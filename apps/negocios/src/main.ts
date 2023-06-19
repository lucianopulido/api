import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NegociosModule } from './negocios.module';



async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NegociosModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();