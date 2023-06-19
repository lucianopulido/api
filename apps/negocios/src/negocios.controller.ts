import { Controller, Get } from '@nestjs/common';
import { NegociosService } from './negocios.service';
import { EventPattern } from '@nestjs/microservices';
import { SearchUser } from 'apps/login/src/dto/search-user.dto';

@Controller()
export class NegociosController {
  constructor(private readonly negociosService: NegociosService) {}

	@EventPattern("findAllUsers")
	async findAllUsers(searchParams: SearchUser) {
		return this.negociosService.findAllUsers(searchParams)
  }
}
