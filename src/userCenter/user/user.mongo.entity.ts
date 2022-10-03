import { Entity, Column, UpdateDateColumn, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id?: string;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  username: string;


  @Column({ default: null })
  email: string;
}
