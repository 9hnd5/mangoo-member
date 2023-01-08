import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/modules/user/schemas/user.schema";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async checkUser(user: Express.User, role?: string) {
    const existUser = await this.userModel
      .findOne({
        _id: user.id,
      })
      .exec();

    if (!existUser || !existUser.role || existUser.role.name !== role) return false;
    return user;
  }
}
