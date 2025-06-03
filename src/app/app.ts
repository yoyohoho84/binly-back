import express from "express";
import formRoutes from "../processes/api/formRoutes";

const app = express();

app.use(express.json());
app.use("/api", formRoutes);

export default app;
