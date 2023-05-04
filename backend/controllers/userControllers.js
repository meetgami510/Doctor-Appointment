import userModel from '../models/userModels.js';
import doctorModel from '../models/doctorModels.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModels.js';
import moment from 'moment';

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
                var userType = "patient";
                if (user.isDoctor) userType = "doctor";
                else if (user.isAdmin) userType = "admin";
                const token = jwt.sign({ id: user._id, userType }, process.env.JWT_SECRET, { expiresIn: '1d' });
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
        const { user } = req.body;
        const checkUser = await userModel.findOne({ $or: [{ email: user.email }, { phone: user.phone }] });
        console.log(checkUser);
        if (checkUser) {
            return res.status(200).send({
                message: 'User Already Exists',
                success: false
            });
        }
        user.password = await bcrypt.hash(user.password, 10);
        const newUser = new userModel(user);
        const resp = await newUser.save();
        console.log(resp);
        res.status(201).send({
            message: 'register successfully',
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: `Register Controller : ${error.message}`,
            success: false,
        });
    }
}

export const getUserDataController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            res.status(200).send({
                message: 'user not found',
                success: false
            });
        } else {
            res.status(200).send({
                user,
                success: true
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'some thing went wrong',
            success: false
        })
    }
}

export const getAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        const seennotifications = user.seennotifications;
        const notifications = user.notifications;
        seennotifications.push(...notifications);
        user.seennotifications = notifications;
        user.notifications = []
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: 'all notifactions marked as read',
            user: updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error while fetching notifications'
        })
    }
}

export const deleteAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        user.seennotifications = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: 'all notifactions marked as read',
            user: updatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error while fetching notifications'
        })
    }
}

export const applyDoctorController = async (req, res) => {
    try {
        console.log(req.body);
        const doctorInfo = req.body;

        const checkDoctor = await doctorModel.findOne({ user: req.body.userId });
        if (checkDoctor) {
            var message = '';
            if (checkDoctor.status === 'approved')
                message = 'your request is already accepted';
            else
                message = 'you are already applied';
            return res.status(200).send({
                message: message,
                success: false
            });
        } else {
            const user = await userModel.findById(req.body.userId);
            const newDoctor = new doctorModel(doctorInfo);
            const obj = await newDoctor.save();
            console.log(obj)
            const adminUser = await userModel.findOne({ isAdmin: true });
            console.log(adminUser)
            const notifications = adminUser.notifications;
            notifications.push({
                type: 'apply-doctor-request',
                message: `${user.firstName} ${user.lastName}`,
                data: {
                    doctorId: newDoctor._id,
                    name: user.firstName + " " + user.lastName,
                    onClickPath: '/admin/doctors'
                }
            });
            await userModel.findByIdAndUpdate(adminUser._id, { notifications });
            res.status(201).send({
                success: true,
                message: 'Doctor account applied successfully'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error while applying for doctor'
        })
    }
}


export const getAllDoctorController = async (req, res) => {
    try {
        const doctorList = await doctorModel.find({ status: 'approved' }).populate('user');
        console.log(doctorList);
        res.status(200).send({
            success: true,
            message: 'doctor list fetched successfully',
            doctorList
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error while fetching notifications'
        })
    }
}

export const bookAppointmentController = async (req, res) => {
    try {
        const { doctorId, userId, timingSlot, doctorUserId, userName, textfeelling } = req.body;
        console.log(req.body);
        const newAppointment = new appointmentModel({
            doctor: doctorId, user: userId, time: timingSlot, feel: textfeelling
        });
        console.log(newAppointment);
        await newAppointment.save();
        console.log(doctorUserId)
        const doctorData = await userModel.findOne({ _id: doctorUserId });
        doctorData.notifications.push({
            type: 'New-Appointment-request',
            message: `A new appointment request from ${userName}`,
            onClickPath: '/user/appointments'
        });
        await doctorData.save();
        res.status(200).send({
            success: true,
            message: `Appointment booked succesfully`
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error while booking appointment'
        })
    }
}

export const bookingAvailabilityController = async (req, res) => {
    try {
        const { doctorId, timingSlot } = req.body;
        // console.log(req.body)
        const date = moment().add(1, 'day').toDate();
        const appointment = await appointmentModel.findOne({
            doctor: doctorId,
            time: timingSlot
        });
        console.log(appointment)
        if (appointment) {
            return res.status(200).send({
                message: 'appointment on this time is already booked',
                success: true
            });
        } else {
            return res.status(200).send({
                message: 'appointment on this time is available',
                success: true,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error while checking availability appointment'
        })
    }
}


export const userAppointmentController = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({ user: req.body.userId })
            .populate({
                path: 'doctor',
                populate: {
                    path: 'user',
                    model: 'user'
                }
            });
        console.log(appointments);
        console.log(appointments[0].doctor.user.name);
        res.status(200).send({
            success: true,
            message: 'User appointment fetch successfully',
            appointments
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'server error, Please try again'
        })
    }
}