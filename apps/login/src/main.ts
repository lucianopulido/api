import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { LoginModule } from "apps/login/src/login.module";

async function bootstrap() {
	const app = await NestFactory.create(LoginModule);
	app.enableCors();
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);
	await app.listen(process.env.PORT);
}
bootstrap();
