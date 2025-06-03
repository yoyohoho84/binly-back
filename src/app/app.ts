import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import formRoutes from "../processes/api/formRoutes";
import logger from "../config/logger";

const app = express();

// Базовые настройки безопасности
app.use(helmet());

// Настройка rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // Лимит запросов с одного IP
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

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

// Сжатие ответов
app.use(compression());

// Middleware для парсинга JSON
app.use(express.json());

// Логирование запросов
app.use(
  (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  }
);

// Маршруты
app.use("/api", formRoutes);

// Обработка ошибок
app.use(
  (
    _err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    logger.error(_err.stack);
    res.status(500).json({
      error: "Internal Server Error",
      message:
        process.env.NODE_ENV === "production"
          ? "Something went wrong"
          : _err.message,
    });
  }
);

export default app;
