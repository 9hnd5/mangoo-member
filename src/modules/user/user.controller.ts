import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Request } from "express";
import { CreateUserCommand } from "src/modules/user/commands/create-user.command";
import { LoginUserCommand } from "src/modules/user/commands/login-user.command";
import { JWTGuard } from "src/modules/user/guards/jwt.guard";
import { GetUserQuery } from "src/modules/user/queries/get-user.query";
import { GetUsersQuery } from "src/modules/user/queries/get-users.query";
import { UserService } from "src/modules/user/user.service";

@Controller("users")
export class UserController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus, private userSerivce: UserService) {}
  @UseGuards(JWTGuard)
  @Get()
  getUsers(@Query() query: GetUsersQuery) {
    return this.queryBus.execute(query);
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
