import { EntityRepository, Repository } from "typeorm";
import { AccessLog } from "../entity";

@EntityRepository(AccessLog)
class AccessLogRepository extends Repository<AccessLog> {
 
}

export { AccessLogRepository }
