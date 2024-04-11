import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { CORS } from './constants';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));

  app.useGlobalPipes(new ValidationPipe({
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
);

const reflector = app.get(Reflector)

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))

  const configService = app.get(ConfigService);
  app.enableCors(CORS);
  app.setGlobalPrefix('api');


  const options = new DocumentBuilder()
  .setTitle('API de Gestión Financiera')
  .setDescription('API para la gestión de usuarios, cuentas bancarias y transacciones financieras')
  .setVersion('1.0')
  .addTag('auth', 'Endpoints relacionados con la autenticación de usuarios')
  .addTag('users', 'Endpoints relacionados con la gestión de usuarios')
  .addTag('acounts', 'Endpoints relacionados con la gestión de cuentas bancarias')
  .addTag('transactions', 'Endpoints relacionados con las transacciones financieras')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  

  await app.listen(configService.get('PORT'));
  console.log(`Application running on: ${await app.getUrl()}`)
}


bootstrap();
