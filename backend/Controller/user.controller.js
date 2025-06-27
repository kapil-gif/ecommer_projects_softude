import express from "express";
import { loginmodel } from "../models/login.model.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export const login = async (req, res) => {
    //console.log("req.body :", req.body);
    const data = req.body;
    const user = await loginmodel(data);

    //console.log("user  ", user);
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
