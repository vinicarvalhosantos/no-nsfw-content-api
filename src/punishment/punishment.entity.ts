import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Punishment {

  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "punishment_name"})
  punishmentName: string;

  @Column({ name: "description" })
  description: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt?: Date;

}