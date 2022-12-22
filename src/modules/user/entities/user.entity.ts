import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
export class Role {
  @Column()
  name: string;
  @Column()
  description?: string;
}
export enum Gender {
  Male = "Male",
  Female = "Female",
}
@Entity("user")
export class User {
  @ObjectIdColumn()
  _id: ObjectID;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  dateOfBirth?: Date;
  @Column({ type: "enum", enum: Gender })
  gender?: Gender;
  @Column(() => Role)
  role?: Role;
}
