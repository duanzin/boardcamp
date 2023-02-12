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

app.use([gameRouter,customerRouter,rentRouter]);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`O server está rodando na porta: ${port}`))