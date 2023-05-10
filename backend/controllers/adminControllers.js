import doctorModel from '../models/doctorModels.js'
import userModel from '../models/userModels.js'
import { sendEmailhandler } from '../utilities/sendEmail.js';

export const getAllUsersController = async (req, res) => {
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

export const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}, { password: 0 }).populate("user");
        res.status(200).send({
            success: true,
            message: 'users data',
            doctors
        })
    } catch (error) {
        res.status(500).send({
            message: `error while fetching doctor list : ${error.message}`,
            success: false,
        });
    }
}

export const changeAccountStatusController = async (req, res) => {
    try {
        const { doctorId, status } = req.body;
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
        const user = await userModel.findById({ _id: doctor.user });
        const notifications = user.notifications;
        notifications.push({
            type: 'doctor account status updated',
            message: `your doctor account has been ${status}`,
            onClickPath: `/notification`
        });
        console.log(user.email);
        const temp =  await sendEmailhandler(user.email,`From Doctor appointment App`,`your doctor account has been ${status}`);
        user.isDoctor = status === 'approved' ? true : false;
        await user.save();
        res.status(201).send({
            success: true,
            message: `Account status updated`,
            data: doctor
        })
    } catch (error) {
        res.status(500).send({
            message: `error while fetching doctor list : ${error.message}`,
            success: false,
        });
    }
}