import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  if (
    configService.get('NODE_ENV') === 'development' ||
    configService.get('NODE_ENV') === 'local'
  ) {
    const options = new DocumentBuilder()
      .setTitle('Authentication API ')
      .setDescription('Touching Student API')
      .addServer('http://localhost:8000/api/v1', 'DEV environment')
      .addServer('https://api-tslp.auth-dev.net/', 'Staging')
      .setVersion('0.0.1')
      .addBearerAuth({
        type: 'http',
      })
      .build();
    const document = SwaggerModule.createDocument(app, options, {});
    SwaggerModule.setup('api-docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
      customSiteTitle: 'Touching Life Student API Documentation',
    });
  }

  await app.listen(configService.get('PORT') ?? 8000);
}
void bootstrap();
