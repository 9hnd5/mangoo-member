import { Exclude, Expose, Transform } from "class-transformer";
import { ObjectId } from "mongoose";
import { Gender, Role } from "src/modules/user/schemas/user.schema";

@Exclude()
export class GetUsersDTO {
  @Expose()
  @Transform((params) => params.obj._id.toString())
  id: ObjectId;
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;
  @Expose()
  email: string;
  @Expose()
  gender?: Gender;
  @Expose()
  role?: Role;
}
