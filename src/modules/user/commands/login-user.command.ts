import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Model } from "mongoose";
import { LoginUserRes } from "src/modules/user/dtos/login-user.res";
import { User, UserDocument } from "src/modules/user/schemas/user.schema";

export class LoginUserCommand {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}

@CommandHandler(LoginUserCommand)
export class LoginUserCommandHandler implements ICommandHandler<LoginUserCommand, LoginUserRes> {
  constructor(private jwtService: JwtService, @InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async execute(command: LoginUserCommand): Promise<LoginUserRes> {
    const { email, password } = command;

    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new BadRequestException("Invalid Credencial");
    const res = new LoginUserRes();
    res.id = user._id;
    res.token = this.jwtService.sign({ id: user._id, role: user.role });
    return res;
  }
}
