import mongoose, { Schema, model } from "mongoose";
import moment from "moment";

const appointmentSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'doctors'
        },
        date: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: "pending",
        },
        time: {
            type: String,
            required: true,
        },
        feel: {
            type: String,
            required: true,
        },
        meetingMode: {
            type: String,
            required: true
        },
        meetingLink: {
            type: String,
        },
    },
    { timestamps: true }
);

const appointmentModel = model("appointments", appointmentSchema);

export default appointmentModel;
