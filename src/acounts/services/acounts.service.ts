import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AcountsEntity } from "../entities/acounts.entity";
import { Repository} from "typeorm";
import { AcountDTO } from "../dto/acounts.dto";

@Injectable()
export class AcountService {

    constructor(@InjectRepository(AcountsEntity) private readonly acountRepository: Repository<AcountsEntity>){}

    public async createAccount(body: AcountDTO): Promise<AcountsEntity>{
        try {
            return await this.acountRepository.save(body);
        } catch (err) {
            throw err(err)
        }
    }

    public async findAllAccounts(): Promise<AcountsEntity []>{
        try {
            return await this.acountRepository.find();
        } catch (err) {
            throw err(err)
        }
    }

    public async findAccountById(id: string): Promise<AcountsEntity> {
        try {
          return await this.acountRepository
            .createQueryBuilder('project')
            .where({ id })
            .leftJoinAndSelect('project.usersIncludes', 'usersIncludes')
            .leftJoinAndSelect('usersIncludes.user', 'user')
            .getOne();
        } catch (err) {
          console.log(err)
        }
      }
}