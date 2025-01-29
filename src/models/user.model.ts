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

export enum RoleEnum {
  USER = "user",
  ADMIN = "admin",
}

@Table({
  tableName: "users",
})
export class User extends Model<UserAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare uid: string;

  @Column(DataType.STRING)
  declare username: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string;

  @AllowNull(false)
  @IsEmail
  @Unique
  @Column(DataType.STRING)
  declare email: string;

  @AllowNull(false)
  @Default(RoleEnum.USER)
  @Column(DataType.ENUM(...Object.values(RoleEnum)))
  declare role: RoleEnum;

  @BeforeUpdate
  @BeforeCreate
  static async hashPassword(user: User) {
    if (!user.changed("password")) {
      return;
    }
    user.password = await bcript.hash(user.password, 10);
  }

  async validatePassword(password: string) {
    return await bcript.compare(password, this.password);
  }
}
