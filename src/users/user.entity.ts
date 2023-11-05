import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  JoinTable,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }

  constructor(
    username: string,
    password: string,
    createdAt?: Date | null,
    id?: string,
  ) {
    this.id = id ?? uuid();
    this.username = username;
    this.password = password;
    this.createdAt = createdAt ?? new Date();
  }
}
