import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {

  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "user_id", type: "bigint", unique: true })
  userId: number;

  @Column({ name: "username" })
  username: string;

  @Column({ name: "user_tag", unique: true })
  userTag: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt?: Date;

}