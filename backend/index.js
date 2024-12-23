import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './Routes/auth.routes.js';
import taskRouter from './Routes/TaskRouter.js'
import connectDB from './db/connectToMongoDB.js';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRouter);

app.get('/', (req, res) => {
  res.status(200).send('Hello from server');
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at PORT ${PORT}`);
});
