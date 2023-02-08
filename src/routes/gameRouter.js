import { Router } from "express";
import { showGames, createGame } from "../controllers/gameController.js";
import { gameSchema } from "../schemas/schema.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const gameRouter = Router();

gameRouter.get("/games", showGames);
gameRouter.post("/games", validateSchema(gameSchema), createGame);


export default gameRouter;