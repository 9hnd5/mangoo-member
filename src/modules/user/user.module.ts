import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { CreateUserCommandHandler } from "src/modules/user/commands/create-user.command";
import { LoginUserCommandHandler } from "src/modules/user/commands/login-user.command";
import { GetUserQueryHandler } from "src/modules/user/queries/get-user.query";
import { JwtStrategy } from "src/modules/user/strategies/jwt.strategy";
import { JWT_KEY } from "src/modules/user/user.const";
import { UserController } from "src/modules/user/user.controller";
import { UserService } from "src/modules/user/user.service";

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: { expiresIn: "1d" },
    }),
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtStrategy,
    CreateUserCommandHandler,
    LoginUserCommandHandler,
    GetUserQueryHandler,
  ],
})
export class UserModule {}
