import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
        website: {
            type: String,
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
        },
        pdf :{
            filename : String,
            contentType: String,
            data: Buffer
        }
    },
    { timestamps: true }
);

export default mongoose.model("doctors", doctorSchema);
