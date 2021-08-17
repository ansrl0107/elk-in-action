import 'reflect-metadata'
import { Connection, createConnection } from 'typeorm'
import { AccessLogRepository } from './accessLog'
import { ShortenUrlRepository } from './shortenUrl'

import * as entities from '../entity'

class DatabaseService {
  private static instance?: DatabaseService

  private static async connect(): Promise<Connection> {
    const conn = await createConnection({
      type: "mysql",
      url: process.env.MYSQL_URI,
      synchronize: true,
      entities: Object.values(entities)
    })

    return conn
  }

  public static async getInstance(): Promise<DatabaseService> {
    if (this.instance) return this.instance

    const conn = await this.connect()

    this.instance = new DatabaseService(conn)

    return this.instance
  }

  public constructor(private conn: Connection) {

  }

  public get accessLog() {
    return this.conn.getCustomRepository(AccessLogRepository)
  }

  public get shortenUrl() {
    return this.conn.getCustomRepository(ShortenUrlRepository)
  }
}

export { DatabaseService }
