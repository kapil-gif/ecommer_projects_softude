import express from "express";
import { login } from "../Controller/user.controller.js"

const routes = express.Router();

routes.post('/login', login);

export default routes;