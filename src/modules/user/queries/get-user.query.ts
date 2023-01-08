import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { plainToInstance } from "class-transformer";
import { Model } from "mongoose";
import { GetUserDTO } from "src/modules/user/dtos/get-user.dto";
import { User, UserDocument } from "src/modules/user/schemas/user.schema";

export class GetUserQuery {
  constructor(public id: string) {}
}

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery, GetUserDTO> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async execute(query: GetUserQuery): Promise<GetUserDTO> {
    const { id } = query;
    const user = await this.userModel.findById(id).exec();
    return plainToInstance(GetUserDTO, user, { excludeExtraneousValues: true });
  }
}
