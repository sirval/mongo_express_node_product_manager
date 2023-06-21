const userModel = require('../Models/userModel');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const maxAge = 3*24*60*60;

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_KEY, {
        expiresIn: maxAge
    });
}

const register = async(req, res, next) => {
    try {
        // const {email, password} = req.body;
        const user = await userModel.create(
            {
                email: req.body.email, 
                password: req.body.password
            });
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        })
        if (user) {
           return res.status(201).json({
            reponse: true,
            message: 'Registration successful',
            data: {token: token, type: 'Bearer'}
           });
        }
    } catch (error) {
        console.log(error.message);
    }
}

const login = async (req, res, next) => {

}

module.exports = {register, login};