import { ObjectID } from "typeorm";

export class LoginUserRes {
  id: ObjectID;
  token: string;
}
