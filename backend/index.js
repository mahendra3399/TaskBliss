import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './Routes/auth.routes.js';
import taskRouter from './Routes/TaskRouter.js'
import connectDB from './db/connectToMongoDB.js';

import path from "path";

const app = express();
const PORT = process.env.PORT || 3000; 
const __dirname = path.resolve();

dotenv.config();


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRouter);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at PORT ${PORT}`);
});
