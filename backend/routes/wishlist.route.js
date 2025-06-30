import express from "express";
import { AddtoWishlist, removewishlist, fetchwishlist } from "../Controller/wishlist.controller.js"
import { verifyToken } from "../middleware/auth.middleware.js";

const routes = express.Router();

routes.post('/addtowishlist', verifyToken, AddtoWishlist);
routes.delete('/removeproductwishlist', verifyToken, removewishlist)
routes.get('/fetchwishlist', verifyToken, fetchwishlist)

export default routes;



