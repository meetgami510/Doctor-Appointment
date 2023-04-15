import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// routes
app.get('/', (req, res) => {
    res.send('hello');
});

// PORT NUMBER
const PORT = process.env.PORT || 8080

// listen port
app.listen(PORT, () => {
    console.log('server is litening', PORT, process.env.NODE_MODE);
});