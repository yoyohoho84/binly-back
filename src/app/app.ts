import express from "express";
import cors from "cors";
import helmet from "helmet";
import formRoutes from "../processes/api/formRoutes";

const app = express();

// Базовые настройки безопасности
app.use(helmet());

// Настройка CORS
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://your-domain.com"] // Замените на ваш домен в продакшене
        : "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware для парсинга JSON
app.use(express.json());

// Обработка ошибок
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      error: "Internal Server Error",
      message:
        process.env.NODE_ENV === "production"
          ? "Something went wrong"
          : err.message,
    });
  }
);

// Маршруты
app.use("/api", formRoutes);

export default app;
