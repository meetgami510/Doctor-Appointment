import express from "express";
import dotenv from "dotenv";
import morgan from 'morgan';
import connectDB from "./config/db.js";
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js";
// import adminRoutes from './routes/adminRoutes.js';
// import doctorRoutes from './routes/doctorRoutes.js';

dotenv.config();

const app = express();

// middleware
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3000'
}));

// mongodb connection
connectDB();

// routes
app.post('/', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// routes
app.use('/api/user', userRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/doctor', doctorRoutes);

// PORT NUMBER
const PORT = process.env.PORT || 8080

// listen port
app.listen(PORT, () => {
    console.log('server is litening', PORT, process.env.NODE_MODE);
});