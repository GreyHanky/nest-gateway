import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Role {

  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name: string;

  @Column()
  systemId: number;

  @Column()
  description: string

  @CreateDateColumn()
  createTime?: string;

  @UpdateDateColumn()
  uupdateTime?: string
}
