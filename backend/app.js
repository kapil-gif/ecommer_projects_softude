import express from "express"
import dotenv from "dotenv"
import userroutes from "./routes/user.route.js"
import productsroutes from "./routes/products.route.js"
import cors from "cors";
import Wishlistroutes from "./routes/wishlist.route.js";
import orders from "./routes/order.routes.js"
import profileupdate from "./routes/profile.routes.js";
//import { insertDummyProducts } from "./models/insertDummyApi.model.js";
dotenv.config();//usingt the env file 

const app = express();
const port = process.env.port || 8080;

app.use(cors());

app.use(express.urlencoded({ extended: true }))
app.use(express.json()) //test on postman send data on body>json
//insertDummyProducts();
app.use('/user', userroutes);
app.use('/products', productsroutes);
app.use('/wishlistproduct', Wishlistroutes)
app.use('/order', orders);
app.use('/profile', profileupdate); //searchbox



app.listen(port, (req, res) => {
    console.log(`Server run on : http://localhost:${port}`);

});