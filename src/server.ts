import "reflect-metadata";
import "dotenv/config";
import app from "./app/app";
import { AppDataSource } from "./config/database";
import fs from "fs";
import https from "https";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established");
    if (process.env.SSL_KEY && process.env.SSL_CERT) {
      const options = {
        key: fs.readFileSync(process.env.SSL_KEY),
        cert: fs.readFileSync(process.env.SSL_CERT),
      };
      https.createServer(options, app).listen(PORT, () => {
        console.log(`HTTPS server is running on port ${PORT}`);
      });
    } else {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
