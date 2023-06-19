import { IsEmail, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class SearchUser {

    @IsOptional()
    @IsNumber()
    @Min(1)
	limit?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
	skip?: number;

    @IsOptional()
    @IsString()
    @IsEmail()
	mail?: string;
}
