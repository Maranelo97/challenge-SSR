import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AcountsEntity } from "../entities/acounts.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { AcountDTO, AcountUpdateDTO } from "../dto/acounts.dto";

@Injectable()
export class AcountService {

    constructor(@InjectRepository(AcountsEntity) private readonly projectRepository: Repository<AcountsEntity>){}

    public async createProject(body: AcountDTO): Promise<AcountsEntity>{
        try {
            return await this.projectRepository.save(body);
        } catch (err) {
            throw err(err)
        }
    }

    public async findAllProjects(): Promise<AcountsEntity []>{
        try {
            return await this.projectRepository.find();
        } catch (err) {
            throw err(err)
        }
    }

    public async findProjectById(id: string): Promise<AcountsEntity> {
        try {
          return await this.projectRepository
            .createQueryBuilder('project')
            .where({ id })
            .leftJoinAndSelect('project.usersIncludes', 'usersIncludes')
            .leftJoinAndSelect('usersIncludes.user', 'user')
            .getOne();
        } catch (err) {
          console.log(err)
        }
      }

      public async updateUser(body: AcountUpdateDTO, id: string): Promise<UpdateResult | undefined> {
        try {
          const project: UpdateResult = await this.projectRepository.update(id, body)
          if (project.affected === 0) {
            return undefined
          }
          return project
        } catch (err) {
          throw err(err)
        }
      }

      public async deleteUser(id: string): Promise<DeleteResult | undefined> {
        try {
          const project: DeleteResult = await this.projectRepository.delete(id)
          if (project.affected === 0) {
            return undefined
          }
          return project
        } catch (err) {
          throw err(err)
        }
      }
}