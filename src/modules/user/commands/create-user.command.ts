import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserRes } from "src/modules/user/dtos/create-user.res";
import { Gender, Role, User, UserDocument } from "src/modules/user/schemas/user.schema";

export class CreateUserCommand {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public dateOfBirth?: Date,
    public gender?: Gender,
    public role?: Role,
  ) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand, CreateUserRes> {
  constructor(private jwtService: JwtService, @InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async execute(command: CreateUserCommand): Promise<CreateUserRes> {
    const { firstName, lastName, email, password, dateOfBirth, gender, role } = command;
    const userModel = new this.userModel({ firstName, lastName, email, password, dateOfBirth, gender, role });
    const rs = await userModel.save();
    const res = new CreateUserRes();
    res.id = rs._id;
    res.token = this.jwtService.sign({ id: rs._id, role: rs.role });
    return res;
  }
}
