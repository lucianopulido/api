import { IsEmail,  IsString, MinLength, IsNotEmpty} from "class-validator"

export class CreateUserDto {

    @IsNotEmpty()
    @IsEmail()
    mail:string
    
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password:string
}