import {applyDecorators, UseGuards} from '@nestjs/common';
import {AccessTokenGuard} from "../guards/jwt.access-token.guard";


export function AuthAccessToken() {

    return applyDecorators(
        UseGuards(AccessTokenGuard),
    );

}