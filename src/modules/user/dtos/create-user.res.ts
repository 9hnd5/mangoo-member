import { ObjectId } from "mongoose";

export class CreateUserRes {
  id: ObjectId;
  token: string;
}
