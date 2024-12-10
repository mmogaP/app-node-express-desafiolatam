import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import protectedRoutes from "./routes/protected";
import pool from "./db/index";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.config";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

(async () => {
  try {
    const { rows } = await pool.query("SELECT NOW()");
    console.log(`DB connecting: ${rows[0].now}`);
    app.listen(port, () => {
      console.log("Servidor andando en el puerto: " + port);
      console.log("Documentación disponible en http://localhost:3000/api-docs");
    });
  } catch (error) {
    console.log(error);
  }
})();