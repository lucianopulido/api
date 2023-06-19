import { Module } from "@nestjs/common";
import { LoginController } from "./login.controller";
import { LoginService } from "./login.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entities/user.entity";
import { EnvConfiguration } from "apps/login/src/config/env.config";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { JwtAccessTokenStrategy } from "./strategies/jwt.access-token.strategy";

@Module({
	imports: [
		JwtModule.register({}),
		ConfigModule.forRoot({
			load: [EnvConfiguration],
		}),
		ClientsModule.register([
			{ name: 'NEGOCIOS_SERVICE', transport: Transport.TCP },
		  ]),
		MongooseModule.forRoot(process.env.MONGODB_URI),
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [LoginController],
	providers: [LoginService,JwtAccessTokenStrategy],
	exports: [MongooseModule],
})
export class LoginModule {}
