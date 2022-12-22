import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { LoginUserRes } from "src/modules/user/dtos/login-user.res";
import { User } from "src/modules/user/entities/user.entity";
import { DataSource, Repository } from "typeorm";

export class LoginUserCommand {
  constructor(public email: string, public password: string) {}
}

@CommandHandler(LoginUserCommand)
export class LoginUserCommandHandler
  implements ICommandHandler<LoginUserCommand, LoginUserRes>
{
  private repo: Repository<User>;
  constructor(ds: DataSource, private jwtService: JwtService) {
    this.repo = ds.getMongoRepository(User);
  }
  async execute(command: LoginUserCommand): Promise<LoginUserRes> {
    const user = await this.repo.findOneBy({ email: command.email });
    if (!user) throw new BadRequestException("Invalid Credencial");
    const res = new LoginUserRes();
    res.id = user._id;
    res.token = this.jwtService.sign({ id: user._id, role: user.role });
    return res;
  }
}
