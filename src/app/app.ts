import express from "express";
import cors from "cors";
import formRoutes from "../processes/api/formRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", formRoutes);

export default app;
