import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: [process.env.WEB_URL] },
  });
  await app.listen(process.env.PORT);
}
bootstrap();
