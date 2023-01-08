import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from "mongoose";
export class Role {
  @Prop()
  name: string;
  @Prop()
  description?: string;
}

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export type UserDocument = HydratedDocument<User>;
@Schema({ collection: "user" })
export class User {
  _id: ObjectId;
  @Prop()
  firstName: string;
  @Prop()
  lastName: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  dateOfBirth?: Date;
  @Prop({ type: String, enum: Gender })
  gender?: Gender;
  @Prop(() => Role)
  role?: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
