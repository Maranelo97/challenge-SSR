import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserDTO, UserToAccountDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';
import { PublicAcces } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('register')
    public async registerUser(@Body() body: UserDTO){
        return await this.userService.createUser(body);
    }

    @Get('all')
    public async findAllUsers(){
        return await this.userService.findUsers()
    }
   
    @PublicAcces()
    @Get(':id')
    public async findUserById(@Param('id') id: string){
        return await this.userService.findUserById(id)
    }

    @Post('add-to-account')
    public async addToAccount(@Body() body: UserToAccountDTO){
        return await this.userService.relationToAccount(body);
    }

    @Put('edit/:id')
    public async updateUser(@Param('id') id:string, @Body() body: UserUpdateDTO){
        return await this.userService.updateUser(body, id);
    }

    @Delete('delete/:id')
    public async deleteUser(@Param('id') id:string){
        return await this.userService.deleteUser(id);
    }
}
