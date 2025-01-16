import express from "express";
import { db } from "./db/index";
import { userRouter } from "./routes/user.route";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.config";

const app = express();

// Middleware para JSON
app.use(express.json());

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
