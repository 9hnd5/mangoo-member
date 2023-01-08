import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/modules/user/user.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot("mongodb://memberService:memberService@localhost:27017/member-service"),
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      port: 27017,
      username: "memberService",
      password: "memberService",
      database: "member-service",
      retryAttempts: 10,
      retryDelay: 3000,
      entities: [__dirname + "/modules/**/**.entity.{ts,js}"],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
