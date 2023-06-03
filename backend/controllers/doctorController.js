import appointmentModel from "../models/appointmentModels.js";
import doctorModel from "../models/doctorModels.js";
import userModel from "../models/userModels.js";

export const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ user: req.body.userId }).populate("user");
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

export const updateProfessionalDetailsController = async (req, res) => {
    try {
        console.log(req.body)
        const doctor = await doctorModel.findOneAndUpdate(
            { user: req.body.userId },
            req.body,
            { new: true }
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
            message: 'server please try again'
        })
    }
}
import mongoose from "mongoose";
export const updateAppointmentStatusController = async (req, res) => {

    console.log("update");
    const { appointmentId, status } = req.body;
    console.log(appointmentId)
    const meetingLink = `http://localhost:3000/video-meeting/${appointmentId}`; // generates a unique ID
    const session = await mongoose.startSession();
    const transactionOptions = {
        readPreference: 'primary',
        readConcern: { level: 'snapshot' },
        writeConcern: { w: 'majority' }
    };
    try {
        const transactionResult = await session.withTransaction(async () => {
            const appointment = await appointmentModel.findByIdAndUpdate(appointmentId, { status, meetingLink }, { session });
            console.log(appointment)
            const user = await userModel.findOne({ _id: appointment.user });
            console.log(user)
            user.notifications.push({
                type: "status-update",
                message: `your appointment has been updated ${status}`,
                onClickPath: "/doctor-appointments"
            });
            await user.save({ session });
            res.status(200).send({
                success: true,
                message: "appointment status updated"
            })
        }, transactionOptions);
        if (transactionResult) {
            console.log("The reservation was successfully created.");
        } else {
            // await session.abortTransaction();
            console.log("The transaction was intentionally aborted.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'appintment status update issue'
        })
    } finally {
        await session.endSession();
    }
}

export const sloatbookingController = async (req, res) => {
    try {
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

export const uploadDocumentpdfController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ user: req.body.userId });
        if (!doctor) {
            return res.status(404).send({
                success: false,
                error,
                message: 'Doctor is not'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'error while upload file'
        })
    }
}