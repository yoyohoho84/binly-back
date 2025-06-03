import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Form {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  phone!: string;

  @Column()
  district!: string;

  @Column()
  address!: string;

  @Column()
  consent!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}
