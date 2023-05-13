import jwt from 'jsonwebtoken';
import userModel from '../models/userModels.js';

const checkUserType = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
            if (err) {
                return res.status(200).send({
                    message: 'authenitication is failed',
                    success: false
                });
            } else {
                try {
                    console.log(req.url)
                    // const userdata = await userModel.findById(decode.id);
                    // if (userdata) {
                    //     req.body.userId = decode.id;
                    //     req.body.userType = decode.userType;
                    //     next();
                    // }
                } catch (error) {
                    return res.status(200).send({
                        message: 'authenitication is failed',
                        success: false
                    });
                }
            }
        })
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: 'authenication is failed',
            success: false
        })
    }
}

export default checkUserType;