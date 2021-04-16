import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Server {

  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "server_id", type: "bigint", unique: true })
  serverId: number;

  @Column({ name: "server_name" })
  serverName: string;

  @Column({ name: "owner_id", type: "bigint" })
  ownerId: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt?: Date;

}