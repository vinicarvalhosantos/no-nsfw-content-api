import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, RelationId } from 'typeorm';


@Entity()
export class User {

  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "userId", type: "bigint" })
  userId: number;

  @Column({ name: "username" })
  username: string;

  @Column({ name: "userTag", unique: true })
  userTag: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt?: Date;

}