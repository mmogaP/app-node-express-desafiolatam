import pool  from "../db/index";
import { User } from "../interfaces/user.interface";

const findAll = async () => {
  const { rows } = await pool.query("SELECT * FROM USERS");
  return rows as User[];
};

const findOneByEmail = async (email: string) => {
  // Datos parametrizados
  const query = {
    text: `
    SELECT * FROM USERS
    WHERE email = $1
    `,
    values: [email],
  };

  const { rows } = await pool.query(query);

  return rows[0] as User; // ORM
};

const create = async (email: string, password: string) => {
  const query = {
    text: `
    INSERT INTO USERS (email, password)
    VALUES ($1, $2)
    RETURNING *
    `,
    values: [email, password],
  };

  const { rows } = await pool.query(query);

  return rows[0] as User;
};

export const UserModel = {
  create,
  findOneByEmail,
  findAll,
};