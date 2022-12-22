import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Request } from "express";
import { CreateUserCommand } from "src/modules/user/commands/create-user.command";
import { LoginUserCommand } from "src/modules/user/commands/login-user.command";
import { User } from "src/modules/user/entities/user.entity";
import { JWTGuard } from "src/modules/user/guards/jwt.guard";
import { GetUserQuery } from "src/modules/user/queries/get-user.query";
import { UserService } from "src/modules/user/user.service";
import { DataSource } from "typeorm";

@Controller("users")
export class UserController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
    private userSerivce: UserService,
    private ds: DataSource,
  ) {}
  @UseGuards(JWTGuard)
  @Get()
  getUsers() {
    return this.ds.getMongoRepository(User).find({});
  }

  @UseGuards(JWTGuard)
  @Get(":id")
  getUser(@Param("id") id: string) {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  @Post()
  createUser(@Body() command: CreateUserCommand) {
    return this.commandBus.execute(command);
  }

  @Post("login")
  loginUser(@Body() command: LoginUserCommand) {
    return this.commandBus.execute(command);
  }

  @UseGuards(JWTGuard)
  @Post("check")
  async checkUser(@Body() data: { role?: string }, @Req() req: Request) {
    const user = req.user;
    if (user) {
      return this.userSerivce.checkUser(user, data.role);
    }
  }
}
