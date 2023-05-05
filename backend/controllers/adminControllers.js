import doctorModel from '../models/doctorModels.js'
import userModel from '../models/userModels.js'

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
        console.log(doctors)
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
        console.log('from change staus')
        console.log(req.body)
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
        console.log(doctor)
        const user = await userModel.findById({ _id: doctor.user });
        const notifications = user.notifications;
        notifications.push({
            type: 'doctor account status updated',
            message: `your doctor account has been ${status}`,
            onClickPath: `/notification`
        });
        user.isDoctor = status === 'approved' ? true : false;
        await user.save();
        res.status(201).send({
            success: true,
            message: `Account status updated`,
            data: doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `error while fetching doctor list : ${error.message}`,
            success: false,
        });
    }
}