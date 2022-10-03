import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class System {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name: string;


  @Column({ type: 'text', default: null })
  description: string;

  @Column()
  creatorId?: string;

  @Column()
  creatorName?: string;

  @CreateDateColumn()
  createTime?: string;

  @UpdateDateColumn()
  updateTime?: string
}
