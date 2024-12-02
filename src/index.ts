import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import protectedRoutes from "./routes/protected";
import pool from "./db/index";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

(async () => {
  try {
    const { rows } = await pool.query("SELECT NOW()");
    console.log(`DB connecting: ${rows[0].now}`);
    app.listen(port, () => {
      console.log("Servidor andando en el puerto: " + port);
    });
  } catch (error) {
    console.log(error);
  }
})();