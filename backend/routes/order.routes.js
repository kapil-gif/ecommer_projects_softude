import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { comformorder, insertorder, cancleOrder } from "../Controller/Order.controller.js";

const routes = express.Router();


routes.post('/comformOrder', verifyToken, comformorder);
routes.post('/inserdataorder', verifyToken, insertorder);
routes.delete('/cancleorder', verifyToken, cancleOrder);

export default routes;














