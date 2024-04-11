import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { UserDTO, UserToAccountDTO, UserUpdateDTO } from '../dto/user.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UsersAcountEntity } from '../entities/usersAcount.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(UsersAcountEntity) private readonly userProjectRepository: Repository<UsersAcountEntity>
  ) { }

  public async createUser(body: UserDTO): Promise<UsersEntity> {
    try {
      body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT)
      return await this.userRepository.save(body);
    } catch (err) {
      console.log(err)
    }
  }

  public async findUsers(): Promise<UsersEntity[]> {
    try {
      const users: UsersEntity[] = await this.userRepository.find();
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Results not found'
        })
      }
      return users
    } catch (err) {
      console.log(err)
    }
  }

  public async findUserById(id: string): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.acountIncludes', 'acountIncludes')
        .leftJoinAndSelect('acountIncludes.project', 'project')
        .leftJoinAndSelect('user.transactionsSent', 'transactionsSent')
        .where('user.id = :id', { id })
        .orWhere('transactionsSent.sender = :id', { id })
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Result not found'
        })
      }
      return user
    } catch (err) {
      console.log(err)
    }
  }

  public async relationToAccount(body: UserToAccountDTO) {
    try {
      return await this.userProjectRepository.save(body);
    } catch (err) {
      console.log(err)
    }
  }

  public async findBy({ key, value }: {
    key: keyof UserDTO;
    value: any
  }) {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ [key]: value })
        .getOne()

      return user;
    } catch (error) {
      console.log(error)
    }
  }

  public async updateUser(body: UserUpdateDTO, id: string): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body)
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Cant update the user'
        })
      }
      return user
    } catch (err) {
      console.log(err)
    }
  }


  public async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id)
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Cant delete the user'
        })
      }
      return user
    } catch (err) {
      console.log(err)
    }
  }

}
