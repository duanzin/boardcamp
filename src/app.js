import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import gameRouter from "./routes/gameRouter.js";
import customerRouter from "./routes/customerRouter.js";
import rentRouter from "./routes/rentRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(gameRouter);
app.use(customerRouter);
app.use(rentRouter);

app.listen(5000);