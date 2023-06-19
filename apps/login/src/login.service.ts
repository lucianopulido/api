import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { IUserResponse } from "./interfaces/user-response.interface";
import { IJwtTokenInterface } from "./interfaces/jwt-token.interface";
import { IJwtPayload } from "./interfaces/jwt-payload.interface";
import { AuthEnum } from "./enums/authEnum";
import { ClientProxy } from "@nestjs/microservices";
import { SearchUser } from "./dto/search-user.dto";

const argon2 = require("argon2");

@Injectable()
export class LoginService {
	constructor(
		private readonly jwtService: JwtService,
		private configService: ConfigService,

		@InjectModel(User.name)
		private readonly user: Model<User>,

		@Inject("NEGOCIOS_SERVICE") private negocioClient: ClientProxy,
	) {}
	async registerUser(createUserDto: CreateUserDto): Promise<IUserResponse> {
		try {
			createUserDto.password = await argon2.hash(createUserDto.password);
			const existingUser = await this.user.findOne({ mail: createUserDto.mail }).lean();

			if (existingUser) {
				throw new BadRequestException("there is a user already created with that email");
			}

			const user = (await this.user.create(createUserDto)).toObject();

			delete user.__v;
			delete user.password;

			return user;
		} catch (error) {
			return error.response;
		}
	}

	async login(createUserDto: CreateUserDto): Promise<IUserResponse> {
		try {
			const user = await this.user.findOne({ mail: createUserDto.mail }, { __v: 0 }).lean();

			if (!user) {
				throw new BadRequestException("User does not exist");
			}

			if (!(await argon2.verify(user.password, createUserDto.password))) {
				throw new BadRequestException("Incorrect password");
			}

			const tokens = await this.getJwtTokens({ id: user._id });

			delete user.password;
			return <IUserResponse>{ ...user, accessToken: tokens.accessToken };
		} catch (error) {
			return error.response;
		}
	}

	private getJwtTokens = async (payload: IJwtPayload): Promise<IJwtTokenInterface> => {
		const accessToken = await this.jwtService.signAsync(
			{ id: payload.id },
			{
				secret: this.configService.get<string>(AuthEnum.JWT_ACCESS_SECRET),
				expiresIn: AuthEnum.EXPIRE_ACCESS_TOKEN,
			},
		);

		return { accessToken };
	};

	async findAllUsers(searchParams: SearchUser) {
		try {
			return this.negocioClient.send("findAllUsers", searchParams);
		} catch (error) {
			return error.response;
		}
	}

	async findOneById(id: string): Promise<User> {
		return this.user.findById(id, { __v: 0 });
	}
}
