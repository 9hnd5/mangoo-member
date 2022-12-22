import { ObjectID } from "typeorm";

export class CreateUserRes {
  id: ObjectID;
  token: string;
}
