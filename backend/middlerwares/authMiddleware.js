import jwt from 'jsonwebtoken';
import userModel from '../models/userModels.js';

const protect = async (req, res, next) => {
    console.log(req.header);


    console.log("from authMiddleware");
    try {
        console.log(req.url)
        const token = req.headers.authorization.split(' ')[1];
        const userType = req.url.split('/')[2];
        const controllerLink = req.url.split('/')[3];
        jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
            if (err) {
                return res.status(200).send({
                    message: 'authenitication is failed',
                    success: false
                });
            } else {
                console.log(decode)
                console.log(userType)
                console.log(controllerLink)
                if (decode.userType === userType || "getAllDoctor" === controllerLink || "getUserData" === controllerLink || ("doctor" === decode.userType && (controllerLink === "update-personal-details" || controllerLink === "verify-video-meeting-id"))) {
                    try {
                        const userdata = await userModel.findById(decode.id);
                        if (userdata) {
                            req.body.userId = decode.id;
                            req.body.userType = decode.userType;
                            next();
                        }
                    } catch (error) {
                        return res.status(200).send({
                            message: 'authenitication is failed',
                            success: false
                        });
                    }
                } else {
                    return res.status(200).send({
                        message: 'authenitication is failed',
                        success: false
                    })
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

export default protect;