import { Router } from "express";
import { showRentals, createRent, endRent, deleteRent } from "../controllers/rentController.js";
import { rentSchema } from "../schemas/schema.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const rentRouter = Router();

rentRouter.get("/rentals", showRentals);
rentRouter.post("/rentals", validateSchema(rentSchema), createRent);
rentRouter.post("/rentals/:id/return", endRent);
rentRouter.delete("/rentals/:id", deleteRent);

export default rentRouter;