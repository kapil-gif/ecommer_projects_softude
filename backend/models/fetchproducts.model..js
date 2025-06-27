import pool from "../config/DbConnection.config.js";

const QUERY = "SELECT * FROM products";

function fetchdata() {
    return new Promise((resolve, reject) => {
        pool.query(QUERY, (err, result) => {
            if (err) {
                console.log("DB Error:", err);
                return reject(err);
            }
            //console.log("In model all products:", result);
            resolve(result);
        });
    });
}

export default fetchdata;












