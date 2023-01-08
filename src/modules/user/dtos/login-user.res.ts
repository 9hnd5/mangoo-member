import { ObjectId } from "mongoose";

export class LoginUserRes {
  id: ObjectId;
  token: string;
}
