import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongodb";
import { User } from "src/modules/user/entities/user.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserService {
  private repo: Repository<User>;
  constructor(ds: DataSource) {
    this.repo = ds.getMongoRepository(User);
  }

  async checkUser(user: Express.User, role?: string) {
    const existUser = await this.repo.findOneBy({
      _id: new ObjectId(user.id) as any,
    });
    if (!existUser || !existUser.role || existUser.role.name !== role)
      return false;
    return user;
  }
}
