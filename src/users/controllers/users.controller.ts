import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
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
   
    @Get(':id')
    public async findUserById(@Param('id') id: string){
        return await this.userService.findUserById(id)
    }

    @Post('add-to-project')
    public async addToProject(@Body() body: UserToProjectDTO){
        return await this.userService.relationToProject(body);
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