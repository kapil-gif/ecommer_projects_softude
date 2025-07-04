import express from "express";
import { loginmodel, signupdata } from "../models/login.model.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const login = async (req, res) => {
    console.log("req.body login controller :", req.body);
    const data = req.body;
    const email = req.body.email;
    const password = req.body.password;

    console.log("email pasword in ontroller login :", email, password);

    const user = await loginmodel(email, password);

    console.log(" Api responce login controller :  ", user);
    // console.log("data ", data);

    // generate a token
    if (user) {
        const secrate = process.env.JWT_SECRET;
        const generatetoken = jwt.sign(user, secrate, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        console.log("generatetoken :", generatetoken);

        return res.status(200).json({
            success: true, statusCode: '200', message: "Login Successfull", data: user, token: generatetoken
        })
    } else
        return res.status(400).json({ success: false, statusCode: 400, message: "Login Failed", data: user })

}

export const signup = async (req, res) => {
    const { firstname, lastname, mobile_no, email, password } = req.body
    console.log(`req.body in controller  :`, req.body);

    try {
        const SignAPIRes = await signupdata(firstname, lastname, mobile_no, email, password);
        console.log(" api responce signup :", SignAPIRes);

        if (SignAPIRes) {
            return res.status(200).json({
                success: true, statusCode: '200', message: "SignUp Successfull", data: SignAPIRes
            })
        }
        return res.status(400).json({ success: false, statusCode: 400, message: "SignUp  Failed" })
    } catch (error) {
        console.log("sign up Api error:", error);


    }



}