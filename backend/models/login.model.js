import pool from "../config/DbConnection.config.js"

export const loginmodel = (data) => {
    const user = new Promise((resolve, reject) => {
        const getUserQuery = "SELECT * FROM user WHERE email = ? AND password = ?";
        pool.query(getUserQuery, [data.email, data.password], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    }).then(Response => {
        return Response[0];
    }).catch(err => {
        return err;
    });

    return user;
};