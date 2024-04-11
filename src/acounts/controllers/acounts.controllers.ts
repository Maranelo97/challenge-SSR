import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AcountService } from '../services/acounts.service';
import { AcountDTO } from '../dto/acounts.dto';


@Controller('acounts')
export class AcountsController {
    constructor(private readonly accService: AcountService) {}

    @Post('create')
    public async createProject(@Body() body: AcountDTO){
        return await this.accService.createProject(body);
    }

    @Get('all')
    public async getAllProjects(){
        return await this.accService.findAllProjects();
        }

    @Get(':id')
    public async getProjectById(@Param('id') id: string){
        return await this.accService.findProjectById(id)
    }


}
