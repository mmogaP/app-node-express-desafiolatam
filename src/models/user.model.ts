import bcript from "bcryptjs";
import { UserAttributes } from "../interfaces/user.interface";

import {
  AllowNull,
  BeforeCreate,
  BeforeUpdate,
  Column,
  DataType,
  Default,
  IsEmail,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";


@Table({
  tableName: "Users",
})
export class User extends Model<UserAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  uid!: string;

  @Column(DataType.STRING)
  username!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @IsEmail
  @Unique
  @Column(DataType.STRING)
  email!: string;

  @BeforeUpdate
  @BeforeCreate
  static async hashPassword(user: User) {
    user.password = await bcript.hash(user.password, 10);
  }
}