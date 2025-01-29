import express from "express";
import cookieParser from "cookie-parser";
import { db } from "./db/index";
import { authRouter } from "./routes/auth.route";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.config";
import { userRouter } from "./routes/user.route";

const app = express();

// Middleware para JSON
app.use(express.json());

// Middleware para cookies
app.use(cookieParser());

// Rutas de autenticación
app.use("/api/v1/auth", authRouter);

// Rutas de usuarios
app.use("/api/v1/users", userRouter);

// Ruta para documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicializar servidor
const main = async () => {
  try {
    await db.authenticate();
    await db.sync({ force: true });
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
      console.log("Swagger docs available at http://localhost:3000/api-docs");
    });
  } catch (error) {
    console.log(error);
  }
};

main();
