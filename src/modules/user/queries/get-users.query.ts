import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { plainToInstance, Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BaseQueryHandler } from "mangoo-core";
import { ObjectId } from "mongodb";
import { Model } from "mongoose";
import { GetUsersDTO } from "src/modules/user/dtos/get-users.dto";
import { User, UserDocument } from "src/modules/user/schemas/user.schema";

export class GetUsersQuery {
  @IsOptional()
  @Transform(({ value }) => value && value.split(","))
  ids?: ObjectId[];

  @IsOptional()
  @IsNotEmpty()
  email?: string;
}
@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler extends BaseQueryHandler implements IQueryHandler<GetUsersQuery, GetUsersDTO[]> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super();
  }
  async execute(query: GetUsersQuery): Promise<GetUsersDTO[]> {
    const { ids, email } = query;

    const users = await this.userModel
      .find({
        ...(ids?.length && { _id: { $in: ids } }),
        ...(email && { email: { $regex: new RegExp(email) } }),
      })
      .exec();
      
    const result = plainToInstance(GetUsersDTO, users, { excludeExtraneousValues: true });
    return result;
  }
}
