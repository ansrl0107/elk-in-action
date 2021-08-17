import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShortenUrl } from "./shortenUrl";

@Entity()
class AccessLog {
  @PrimaryGeneratedColumn()
  public id!: number

  @CreateDateColumn()
  public createdAt!: Date

  @ManyToOne(() => ShortenUrl)
  public shortenUrl!: ShortenUrl
}

export { AccessLog }

