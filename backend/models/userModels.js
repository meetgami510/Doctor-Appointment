import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
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
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    address: {
        type: String,
        required: [true, "address is required"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isDoctor: {
        type: Boolean,
        default: false,
    },
    notifications: {
        type: Array,
        default: []
    },
    seennotifications: {
        type: Array,
        default: []
    }
});


export default mongoose.model('user', userSchema);