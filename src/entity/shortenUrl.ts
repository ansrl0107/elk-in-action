import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class ShortenUrl {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public originalUrl!: string

  @Column()
  @Index({ unique: true })
  public shortId!: string
}

export { ShortenUrl }
