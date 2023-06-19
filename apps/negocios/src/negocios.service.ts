import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SearchUser } from "apps/login/src/dto/search-user.dto";
import { User } from "apps/login/src/entities/user.entity";
import { Model } from "mongoose";

@Injectable()
export class NegociosService {
	constructor(
		@InjectModel(User.name)
		private readonly user: Model<User>,
	) {}
	async findAllUsers(searchParams: SearchUser) {
		try {
			if (searchParams.mail) {
				return await this.user
					.findOne(
						{ mail: searchParams.mail },
						{ password: 0, __v: 0 },
						{ collation: { locale: "en_US", strength: 2 } },
					)
					.lean();
			}

			if (searchParams.skip !== undefined && searchParams.limit !== undefined) {
				return await this.user
					.find({}, { password: 0, __v: 0 })
					.limit(searchParams.limit)
					.skip(searchParams.skip);
			}
			return await this.user.find({}, { password: 0, __v: 0 });
		} catch (error) {
			return error;
		}
	}
}
