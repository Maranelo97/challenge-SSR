import { Body, Controller, Post } from '@nestjs/common';
import { AuthBody } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';
import { AuthBodyDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }
    @Post('login')
    async login(@Body() { username, password }: AuthBodyDTO) {
        const userValidate = await this.authService.validateUser(username, password);

        if(!userValidate){
            console.log("Data not valid!")
        }

        const jwt = await this.authService.generateJWT(userValidate);

        return jwt;
    }
}
