import pool from "../config/DbConnection.config.js"

export const loginmodel = (email, password) => {

    return new Promise((resolve, reject) => {
        const getUserQuery = "SELECT * FROM user WHERE email = ? AND password = ?";
        console.log("email pasword in model login :", email, password);
        pool.query(getUserQuery, [email, password], (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log("result in model login : ", result);
                resolve(result);
            }

        });
    }).then(Response => {
        return Response[0];
    }).catch(err => {
        return err;
    });


};

export const signupdata = (full_name, last_name, mobile_no, email, password) => {
    console.log(" insert data in model :", full_name, last_name, mobile_no, email, password);

    const signupdataquery = `INSERT INTO user (full_name, last_name, mobile_no, email, password)
VALUES (?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
        pool.execute(signupdataquery, [full_name, last_name, mobile_no, email, password], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
}