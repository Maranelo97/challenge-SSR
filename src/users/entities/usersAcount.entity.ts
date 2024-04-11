import { BaseEntity } from "../../config/base.entity";
import { ACCESS_LEVEL } from "../../constants/roles";
import { Column, Entity, ManyToOne } from "typeorm";
import { UsersEntity } from "./users.entity";
import { AcountsEntity } from "../../acounts/entities/acounts.entity";


@Entity({ name: 'users_projects' })
export class UsersAcountEntity extends BaseEntity {
    @Column({ type: 'enum', enum: ACCESS_LEVEL })
    accessLevel: ACCESS_LEVEL;


    @ManyToOne(() => UsersEntity, (user) => user.acountIncludes)
    user: UsersEntity;
    @ManyToOne(() => AcountsEntity, (project) => project.usersIncludes)
    project: AcountsEntity
}