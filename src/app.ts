import "dotenv/config";

import express from "express";
import rateLimit from "express-rate-limit";
import { httpErrorHandle } from "./middlewares/httpErrorHandle.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import authRoute from "./routes/auth";
import userRoute from "./routes/user.route";
import protectedRoute from "./routes/protected";

import swaggerUi from "swagger-ui-express";
import openapiSpecification from "./config/swagger.config";

const app = express();

app.use(
  "/api/v1/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(openapiSpecification)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar el limitador
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 peticiones por IP
  message:
    "Demasiadas solicitudes desde esta IP, por favor inténtalo más tarde.",
  standardHeaders: true, // Informa el límite en las cabeceras `RateLimit-*`
  legacyHeaders: false, // Desactiva las cabeceras `X-RateLimit-*`
});

// Aplicar el limitador globalmente
app.use(limiter);

app.use(loggerMiddleware);

app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/protected", protectedRoute);

app.use(httpErrorHandle);

export default app;