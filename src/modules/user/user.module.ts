import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { CreateUserCommandHandler } from "src/modules/user/commands/create-user.command";
import { LoginUserCommandHandler } from "src/modules/user/commands/login-user.command";
import { GetUserQueryHandler } from "src/modules/user/queries/get-user.query";
import { GetUsersQueryHandler } from "src/modules/user/queries/get-users.query";
import { User, UserSchema } from "src/modules/user/schemas/user.schema";
import { JwtStrategy } from "src/modules/user/strategies/jwt.strategy";
import { JWT_KEY } from "src/modules/user/user.const";
import { UserController } from "src/modules/user/user.controller";
import { UserService } from "src/modules/user/user.service";

const queryHandlers = [GetUserQueryHandler, GetUsersQueryHandler];
const commandHandlers = [CreateUserCommandHandler, LoginUserCommandHandler];
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: JWT_KEY,
      signOptions: { expiresIn: "7d" },
    }),
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, ...commandHandlers, ...queryHandlers],
})
export class UserModule {}
