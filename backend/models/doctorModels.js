import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
        },
        address: {
            type: String,
            required: [true, "Address is required"],
        },
        specialization: {
            type: String,
            required: [true, "Specialization is required"],
        },
        experience: {
            type: String,
            required: [true, "Experience is required"],
        },
        feesPerCunsaltation: {
            type: Number,
            required: [true, "Fee is required"],
        },
        slots: {
            type: [String],
            required: [true, "atleast one slot is required"],
        },
        status: {
            type: String,
            default: "pending",
        }
    },
    { timestamps: true }
);

export default mongoose.model("doctors", doctorSchema);
