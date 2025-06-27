
import fetchdata from "../models/fetchproducts.model..js"

export const fetchproducts = async (req, res) => {
    const allproducts = await fetchdata();
    // console.log("get all products in constroller :", allproducts);

    if (allproducts)
        return res.status(200).json({ success: true, statusCode: '200', message: "All Products", allproducts })
    else
        return res.status(400).json({ success: false, statusCode: 400, message: "field products" })


}


















