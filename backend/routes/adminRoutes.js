import userModel from '../models/userModels.js';


const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({ '_id': { $ne: req.body.userId } }, { password: 0 });
        res.status(200).send({
            success: true,
            message: 'users data',
            users
        })
    } catch (error) {
        res.status(500).send({
            message: `error while fetching users list : ${error.message}`,
            success: false,
        });
    }
}