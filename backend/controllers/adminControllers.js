import doctorModel from '../models/doctorModels.js'
import userModel from '../models/userModels.js'
import { sendEmailhandler } from '../utilities/sendEmail.js';
import mongoose from 'mongoose';

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
    const { doctorId, status } = req.body;
    const session = await mongoose.startSession();
    const transactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'snapshot' },
        writeConcern: { w: 'majority' }
    };
    try {
        const transactionResult = await session.withTransaction(async () => {
            const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status }, { session });
            const user = await userModel.findById({ _id: doctor.user }, { session });
            const notifications = user.notifications;
            notifications.push({
                type: 'doctor account status updated',
                message: `your doctor account has been ${status}`,
                onClickPath: `/notification`
            });
            const temp = await sendEmailhandler(user.email, `From Doctor appointment App`, `your doctor account has been ${status}`);
            user.isDoctor = status === 'approved' ? true : false;
            await user.save({ session });
            res.status(201).send({
                success: true,
                message: `Account status updated`,
                data: doctor
            })
        }, transactionOptions);
        if (transactionResult) {
            console.log("The reservation was successfully created.");
        } else {
            // await session.abortTransaction();
            console.log("The transaction was intentionally aborted.");
        }
    } catch (error) {

        res.status(500).send({
            message: `error while fetching doctor list : ${error.message}`,
            success: false,
        });
    } finally {
        await session.endSession();
    }
}


export const blockUsersControllers = async (req, res) => {
    try {
        const userdeleteId = req.body.userdeleteId;



        const isForeignKey = await doctorModel.exists({ foreignKey: ObjectId(userdeleteId) });

        let result;
        if (isForeignKey) {
            const result1 = await doctorModel.deleteMany({ foreignKey: ObjectId(userdeleteId) });
            result = await userModel.deleteOne({ _id: ObjectId(userdeleteId) });
        } else {
            result = await userModel.deleteOne({ _id: ObjectId(userdeleteId) });
        }

        if (result.deletedCount === 1) {
            return res.status(201).send({
                success: true,
                message: `Delete Succeffully`,
            });
        } else {
            return res.status(201).send({
                success: false,
                message: `MongoDB server Error`,
            });
        }
    } catch (error) {
        res.status(500).send({
            message: `error while fetching doctor list : ${error.message}`,
            success: false,
        });
    }
}