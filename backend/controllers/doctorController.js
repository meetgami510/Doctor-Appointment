import appointmentModel from "../models/appointmentModels.js";
import doctorModel from "../models/doctorModels.js";
import userModel from "../models/userModels.js";
import { v4 as uuidv4 } from 'uuid';

export const getDoctorByIdController = async (req, res) => {
    try {
        console.log(req.body.doctorId);
        const doctor = await doctorModel.findById({ _id: req.body.doctorId }).populate("user");
        console.log(doctor);
        res.status(200).send({
            success: true,
            message: 'single doctor data fetch successfully',
            doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'doctor profile update issue'
        })
    }
}

export const getDoctorInfoController = async (req, res) => {
    try {
        console.log(req.body.userId)
        const doctor = await doctorModel.findOne({ user: req.body.userId });
        console.log(doctor);
        res.status(200).send({
            success: true,
            message: 'doctor data fetch successfully',
            doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error in fetching doctor details'
        })
    }
}

export const updateProfileController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate(
            { user: req.body.userId },
            req.body
        );
        res.status(200).send({
            success: true,
            message: 'doctor data update successfully',
            doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'doctor profile update issue'
        })
    }
}

export const getDoctorAppointmentsController = async (req, res) => {
    try {
        console.log(req.body.userId)
        const doctor = await doctorModel.findOne({ user: req.body.userId });
        console.log(doctor);
        if (doctor) {
            // const appointments = await appointmentModel.find({ doctor: doctor._id });
            const appointments = await appointmentModel
                .find({ doctor: doctor._id })
                .populate({ path: 'user', select: '-isAdmin -isDoctor -notifications -seennotifications -password' });

            // console.log(appointment)

            console.log(appointments);
            return res.status(200).send({
                success: true,
                message: 'appointments data fetched successfully',
                appointments
            })
        }
        return res.status(500).send({
            success: false,
            error,
            message: 'doctor profile update issue'
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'doctor profile update issue'
        })
    }
}

export const updateAppointmentStatusController = async (req, res) => {
    try {
        console.log("update");
        const { appointmentId, status } = req.body;

        const meetingLink = `http://localhost:3000/video-meeting/${uuidv4()}`; // generates a unique ID

        const appointment = await appointmentModel.findByIdAndUpdate(appointmentId, { status, meetingLink });
        console.log(appointment)
        const user = await userModel.findOne({ _id: appointment.user });
        user.notifications.push({
            type: "status-update",
            message: `your appointment has been updated ${status}`,
            onClickPath: "/doctor-appointments"
        });
        await user.save();
        res.status(200).send({
            success: true,
            message: "appointment status updated"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'appintment status update issue'
        })
    }
}

export const sloatbookingController = async (req, res) => {
    try {
        // const { morningTimeslot, eveningTimeslot } = req.body;
        console.log(req.body.userId);
        const doctor = await doctorModel.findOneAndUpdate(
            { user: req.body.userId },
            { timeSlot: req.body.timeSlot }
        );
        console.log(doctor);
        return res.status(200).send({
            success: true,
            message: "sloat is booked succefully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'appintment status update issue'
        })
    }
}