import { productOrder, fetchMyorder, comformationOrder, insertorderdata, fetchsigledataorder, orderCancle } from "../models/order.model.js"

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

export const comformorder = async (req, res) => {
    try {
        const detials = req.body;
        console.log("detils order in controlers : ", detials);
        // const user_id = detials.userd;
        // const total_amount = detials.total_amount;
        // const payment_method = detials.payment_method;
        // const shipping_address = detials.shipping_address;
        // const billing_address = detials.billing_address;

        // console.log(`user_id: ${user_id}, total_amount: ${total_amount}, payment_method: ${payment_method}, shipping_address: ${shipping_address}, billing_address: ${billing_address}`);

        const responce = await comformationOrder(detials);
        if (responce) {
            console.log("responce APi : ", responce);

            res.status(200).json({
                success: true,
                code: "200",
                message: "Your order succefully",
                responce
            })
        }
    } catch (error) {
        console.log("comfromation Order error : ", error);
        res.status(500).json({
            success: false,
            code: "500",
            message: "Your order not succefully",
            responce
        })
    }
}

export const insertorder = async (req, res) => {
    try {
        const detailsArray = req.body; // This is an array of product objects

        if (!Array.isArray(detailsArray) || detailsArray.length === 0) {
            return res.status(400).json({
                success: false,
                code: "400",
                message: "No order items provided"
            });
        }

        for (const item of detailsArray) {
            const {
                order_id,
                user_id,
                product_id,
                product_title,
                product_img,
                quantity,
                price
            } = item;

            console.log(`📝 Order Item:
Order ID: ${order_id}
User ID: ${user_id}
Product ID: ${product_id}
Title: ${product_title}
Image: ${product_img}
Quantity: ${quantity}
Price: ₹${price}
Total: ₹${quantity * price}
`);

            await insertorderdata(item); // You may want to batch insert instead of one-by-one
        }

        res.status(200).json({
            success: true,
            code: "200",
            message: "Order items inserted successfully"
        });

    } catch (error) {
        console.error("❌ Insert order items error:", error);
        res.status(500).json({
            success: false,
            code: "500",
            message: "Your order was not successful",
            error
        });
    }
};

export const fetchsingleorder = async (req, res) => {
    try {
        const id = req.query.orderitems_id;
        console.log("user id in fecthOrder controller :", id);
        const fetchOrder = await fetchsigledataorder(id);
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

export const cancleOrder = async (req, res) => {
    try {
        const id = req.query.orderitems_id;
        console.log("user id in cancleOrder controller :", id);
        const cancleOrderRes = await orderCancle(id);
        console.log("Fetech Api response : ", cancleOrderRes);

        if (cancleOrderRes) {
            return res.status(200).json({
                success: true,
                code: "200",
                message: "your order cancle",
                cancleOrderRes
            })
        } else {
            return res.status(500).json({
                success: false,
                code: "500",
                message: " your order not cancle",
                err
            })
        }
    } catch (error) {
        console.log(error);

    }

}
