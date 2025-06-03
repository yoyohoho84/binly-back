import { DataSource } from "typeorm";
import { Form } from "../entities/form/entity/Form";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "forms_db",
  synchronize: true,
  logging: true,
  entities: [Form],
  subscribers: [],
  migrations: [],
});
