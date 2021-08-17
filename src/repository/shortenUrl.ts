import { EntityRepository, Repository } from "typeorm";
import { ShortenUrl } from "../entity";

@EntityRepository(ShortenUrl)
class ShortenUrlRepository extends Repository<ShortenUrl> {

}

export { ShortenUrlRepository }
