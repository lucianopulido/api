import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { LoginService } from "./login.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AccessTokenGuard } from "./guards/jwt.access-token.guard";
import { SearchUser } from "./dto/search-user.dto";

@Controller()
export class LoginController {
	constructor(private readonly loginService: LoginService) {}

	@Post()
	async registerUser(@Body() createUserDto: CreateUserDto) {
		return this.loginService.registerUser(createUserDto);
	}

	@Post("login")
	async login(@Body() createUserDto: CreateUserDto) {
		return this.loginService.login(createUserDto);
	}

	@UseGuards(AccessTokenGuard)
	@Get("users")
	async findAllUsers(@Query() searchParams: SearchUser) {
		return this.loginService.findAllUsers(searchParams);
	}
}
