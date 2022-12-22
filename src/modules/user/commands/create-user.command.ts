import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JwtService } from "@nestjs/jwt";
import { CreateUserRes } from "src/modules/user/dtos/create-user.res";
import { Gender, Role, User } from "src/modules/user/entities/user.entity";
import { DataSource } from "typeorm";

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
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand, CreateUserRes>
{
  constructor(private jwtService: JwtService, private dataSource: DataSource) {}
  async execute(command: CreateUserCommand): Promise<CreateUserRes> {
    const user = new User();
    user.firstName = command.firstName;
    user.lastName = command.lastName;
    user.email = command.email;
    user.password = command.password;
    user.dateOfBirth = command.dateOfBirth;
    user.gender = command.gender;
    user.role = command.role;
    const result = await this.dataSource.getMongoRepository(User).save(user);

    const res = new CreateUserRes();
    res.id = result._id;
    res.token = this.jwtService.sign({ id: user._id, role: user.role });

    return res;
  }
}
