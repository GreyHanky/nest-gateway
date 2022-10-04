import { PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn, Entity } from "typeorm";



export enum PrivilegeStatus {
  DENY = 0,
  ALLOW = 1,
  NOT_SET = 2
}

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}


@Entity()
export class Privilage {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  systemId: number

  @Column()
  resourceKey: string

  @Column()
  action: string;

  @Column({default: PrivilegeStatus.ALLOW})
  status?: PrivilegeStatus

  @Column()
  name: string;

  @Column()
  description?: string;

  @CreateDateColumn()
  createTime?: string;
}
