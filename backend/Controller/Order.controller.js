import { productOrder, fetchMyorder } from "../models/order.model.js"

export const orderAllproduct = async (req, res) => {
    try {
        const user_Id = req.body.user_id;
        console.log("request body :", req.body);

        const orderAllresponce = await productOrder(user_Id);
        console.log("orderAllresponce", orderAllresponce);

        if (orderAllresponce) {
            return res.status(200).json({
                success: true,
                code: "200",
                message: "Your Order added",
                orderAllresponce
            });
        }

        return res.status(500).json({
            success: false,
            code: "500",
            message: "Your Order failed"
        });

    } catch (err) {
        console.error("Error placing order:", err);
        return res.status(500).json({
            success: false,
            code: "500",
            message: "Internal server error",
            error: err.message
        });
    }
};

export const fetchorder = async (req, res) => {
    try {
        const user_id = req.query.userid;
        console.log("user id in fecthOrder controller :", user_id);
        const fetchOrder = await fetchMyorder(user_id);
        console.log("Fetech Api response : ", fetchOrder);

        if (fetchOrder) {
            return res.status(200).json({
                success: true,
                code: "200",
                message: "your order list",
                fetchOrder
            })
        } else {
            return res.status(500).json({
                success: false,
                code: "500",
                message: "feild fetch your order list",
                err
            })
        }
    } catch (error) {
        console.log(error);

    }

}