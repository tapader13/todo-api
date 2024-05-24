//import
import express from 'express';
import dotnev from 'dotenv';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import todolistRoutes from './routes/todolistRoutes.js';
import connectDb from './config/db.js';
import cookieParser from 'cookie-parser';
//config
const app = express();
dotnev.config();
connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//api
app.use('/api/users', userRoutes);
app.use('/api/users', todolistRoutes);

//default api
app.get('/', (req, res) => {
  res.send('server working fine');
});

app.use(notFound);
app.use(errorHandler);
//server listen
app.listen(process.env.PORT, () =>
  console.log(`server start at ${process.env.PORT}`)
);
