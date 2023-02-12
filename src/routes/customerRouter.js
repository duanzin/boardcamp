import { Router } from "express";
import { showCustomers, showCustomer,  createCustomer, updateCustomer } from "../controllers/customerController.js";
import { customerSchema } from "../schemas/schema.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const customerRouter = Router();

customerRouter.get("/customers", showCustomers);
customerRouter.get("/customers:id", showCustomer);
customerRouter.post("/customers", validateSchema(customerSchema), createCustomer);
customerRouter.put("/customers/:id", validateSchema(customerSchema), updateCustomer)

export default customerRouter;