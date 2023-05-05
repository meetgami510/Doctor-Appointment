import appointmentModel from "../models/appointmentModels.js";
import doctorModels from "../models/doctorModels.js";

export const getAppointmentsController = async (req, res) => {
    try {
        console.log('hello')
        if ("doctor" === req.body.userType) {
            const doctor = await doctorModels.findOne({ user: req.body.userId });
            console.log(doctor);
            if (doctor) {
                const appointments = await appointmentModel
                    .find({ doctor: doctor._id })
                    .populate({ path: 'user', select: '-isAdmin -isDoctor -notifications -seennotifications -password' });
                console.log(appointments);
                return res.status(200).send({
                    success: true,
                    message: 'appointments data fetched successfully',
                    appointments
                })
            }
        } else {
            const appointments = await appointmentModel.find({ user: req.body.userId })
                .populate({
                    path: 'doctor',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                });
            return res.status(200).send({
                success: true,
                message: 'User appointment fetch successfully',
                appointments
            })
        }
        return res.status(500).send({
            success: false,
            error,
            message: 'server error, Please try again'
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