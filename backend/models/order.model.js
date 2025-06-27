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








