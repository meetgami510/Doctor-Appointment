import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
        firstName: {
            type: String,
            required: [true, "first name is required"],
        },
        lastName: {
            type: String,
            required: [true, "last name is required"],
        },
        phone: {
            type: String,
            required: [true, "phone no is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
        },
        website: {
            type: String,
        },
        address: {
            type: String,
            required: [true, "address is required"],
        },
        specialization: {
            type: String,
            required: [true, "specialization is require"],
        },
        slots: {
            type: [String],
            required: [true, "atleast one slot is required"],
        },
        experience: {
            type: String,
            required: [true, "experience is required"],
        },
        feesPerCunsaltation: {
            type: Number,
            required: [true, "fee is required"],
        },
        status: {
            type: String,
            default: "pending",
        },
        timeSlot: {
            morningStart: { type: String, required: true },
            morningEnd: { type: String, required: true },
            eveningStart: { type: String, required: true },
            eveningEnd: { type: String, required: true },
        }
    },
    { timestamps: true }
);

export default mongoose.model("doctors", doctorSchema);
