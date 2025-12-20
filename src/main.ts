import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppDataSource } from './data-source';

async function bootstrap() {
   await AppDataSource.initialize();

  const app = await NestFactory.create(AppModule);
  
  //  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Client')
    .setDescription('Documentation de l’API Client')
    .setVersion('1.0')
    // .addBearerAuth() // si JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
