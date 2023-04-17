import userModel from '../models/userModels.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// login call back
export const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            console.log(password);
            const isMatch = await bcrypt.compare(password, user.password);
            if (false === isMatch) {
                return res.status(200).send({
                    message: 'invalid credationals',
                    success: false
                });
            } else {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
                return res.status(200).send({
                    message: 'Login successfully',
                    token,
                    success: true,
                });
            }
        } else {
            res.status(200).send({
                message: 'invalid credationals',
                success: false
            });
        }
    } catch (error) {
        res.status(500).send({
            message: `Login Controller : ${error.message}`,
            success: false,
        });
    }
}

// register call back
export const registerController = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password, name } = req.body;

        const checkUser = await userModel.findOne({ email });
        if (checkUser) {
            return res.status(200).send({
                message: 'User Already Exists',
                success: false
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ email, hashPassword, name });
        const resp = await newUser.save();
        console.log(resp);
        res.status(200).send({
            message: 'register successfully',
            success: true
        })
    } catch (error) {
        res.status(500).send({
            message: `Register Controller : ${error.message}`,
            success: false,
        });
    }
}