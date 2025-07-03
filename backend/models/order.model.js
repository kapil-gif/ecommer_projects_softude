import pool from "../config/DbConnection.config.js";


//insert the order_items data 
const orderItemquery = `INSERT INTO order_items (user_id, product_id, product_title, product_img, quantity, price)
SELECT 
    c.userId, 
    c.productId, 
    p.title, 
    p.img,             
    c.quantity, 
    p.price
FROM cart c
JOIN products p ON c.productId = p.id
WHERE c.userId = ?;
`

export function productOrder(user_Id) {
    console.log("prodcy order in model user id :", user_Id);

    return new Promise((resolve, reject) => {
        pool.execute(orderItemquery, [user_Id], (err, result) => {
            if (err) {
                console.log(err);
                return reject(err)
            }
            console.log(result);
            return resolve(result);

        })
    })

}

export async function fetchMyorder(user_id) {
    const fetchproductByuserID = `select * from order_items where user_id=?`;
    console.log("order model user id :", user_id);

    return new Promise((resolve, reject) => {
        pool.query(fetchproductByuserID, [user_id], (err, result) => {
            if (err) {
                console.log("err in model :", err);
                return reject(err)
            }
            //console.log("result :", result);
            return resolve(result)
        });
    })
}


export async function comformationOrder(detials) {
    const conformationorderdetils = `INSERT INTO orders (user_id, total_amount, payment_method, shipping_address, billing_address)
VALUES (?, ?, ?, ?, ?);`
    return new Promise((resolve, reject) => {
        const user_id = detials.user_id;
        const total_amount = detials.total_amount;
        const payment_method = detials.payment_method;
        const shipping_address = detials.shipping_address;
        const billing_address = detials.billing_address;

        console.log(`model  in : user_id: ${user_id}, total_amount: ${total_amount}, payment_method: ${payment_method}, shipping_address: ${shipping_address}, billing_address: ${billing_address}`);

        pool.execute(conformationorderdetils, [user_id, total_amount, payment_method, shipping_address, billing_address],
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result)
            })
    })
}


export async function insertorderdata(detials) {
    const insertdata = `INSERT INTO order_items (
       
        user_id,
        product_id,
        product_title,
        product_img,
        quantity,
        price
    ) VALUES ( ?, ?, ?, ?, ?, ?);`;

    const {
        order_id,
        user_id,
        product_id,
        product_title,
        product_img,
        quantity,
        price
    } = detials;

    console.log(`📝 Order Item Details in model:
Order ID: ${order_id}
User ID: ${user_id}
Product ID: ${product_id}
Product Title: ${product_title}
Product Image: ${product_img}
Quantity: ${quantity}
Price per unit: ₹${price}
Total Price (calculated by DB): ₹${quantity * price}
`);

    return new Promise((resolve, reject) => {
        pool.execute(
            insertdata,
            [user_id, product_id, product_title, product_img, quantity, price],
            (err, result) => {
                if (err) {
                    console.error(" DB Error:", err);
                    return reject(err);
                }
                console.log(" Order item inserted:", result);
                return resolve(result);
            }
        );
    });
}


export async function fetchsigledataorder(id) {
    const fetchproductByuserID = `select * from order_items where id=?`;
    console.log("order model user id :", id);

    return new Promise((resolve, reject) => {
        pool.query(fetchproductByuserID, [id], (err, result) => {
            if (err) {
                console.log("err in model :", err);
                return reject(err)
            }
            //console.log("result :", result);
            return resolve(result)
        });
    })
}


export async function orderCancle(id) {
    const fetchproductByuserID = `DELETE FROM order_items WHERE id = ?`;
    console.log("order model user id :", id);

    return new Promise((resolve, reject) => {
        pool.query(fetchproductByuserID, [id], (err, result) => {
            if (err) {
                console.log("err in model :", err);
                return reject(err)
            }
            //console.log("result :", result);
            return resolve(result)
        });
    })
}