import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";
import { LoginService } from "../login.service";
import { User } from "../entities/user.entity";


@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, "jwt_access_token") {
	constructor(private configService: ConfigService, private loginService: LoginService) {
		super({
			secretOrKey: configService.get("JWT_ACCESS_SECRET"),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	async validate(payload: IJwtPayload): Promise<User> {
		const { id } = payload;

		const user = await this.loginService.findOneById(id);

		if (!user) {
			throw new UnauthorizedException("Token not valid");
		}

		return user;
	}
}
