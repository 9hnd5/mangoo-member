import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ObjectId } from "mongodb";
import { User } from "src/modules/user/entities/user.entity";
import { DataSource } from "typeorm";

export class GetUserQuery {
  constructor(public id: string) {}
}

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery, any> {
  constructor(private ds: DataSource) {}
  execute(query: GetUserQuery): Promise<any> {
    return this.ds.getMongoRepository(User).findOneBy({ _id: new ObjectId(query.id) as any });
  }
}
