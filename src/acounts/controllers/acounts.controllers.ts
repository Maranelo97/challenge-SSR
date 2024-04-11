import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AcountService } from '../services/acounts.service';
import { AcountDTO } from '../dto/acounts.dto';


@Controller('acounts')
export class AcountsController {
    constructor(private readonly accService: AcountService) {}

    @Post('create')
    public async createAccount(@Body() body: AcountDTO){
        return await this.accService.createAccount(body);
    }

    @Get('all')
    public async getAllAccounts(){
        return await this.accService.findAllAccounts();
        }

    @Get(':id')
    public async getAccountById(@Param('id') id: string){
        return await this.accService.findAccountById(id)
    }


}
