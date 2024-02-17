import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';

config();

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

import adminRouter from './routes/admin.route.js';
app.use('/api/v1/admin', adminRouter);

import authRouter from './routes/auth.route.js';
app.use('/api/v1/auth', authRouter);

import userRoute from './routes/user.route.js';
app.use('/api/v1/user', userRoute);

// room
import roomRoute from './routes/room.route.js';
app.use('/api/v1/room', roomRoute);

import roomReservationRoute from './routes/roomResevation.route.js';
app.use('/api/v1/roomreservation', roomReservationRoute);

// menu route
import menuRoute from './routes/menu.route.js';
app.use('/api/v1/menu', menuRoute);

// restaurant
import restaurantRoute from './routes/restaurant.route.js';
app.use('/api/v1/restaurant', restaurantRoute);

// news
import newsRoute from './routes/news.route.js';
app.use('/api/v1/news', newsRoute);

// reply
import replyRoute from './routes/reply.route.js';
app.use('/api/v1/reply', replyRoute);


// review
import reviewRoute from './routes/review.route.js';
app.use('/api/v1/review', reviewRoute);

app.use((req, res) => {
  res.status(404).json({ message: '404: Not Found' });
});



app.listen(process.env.PORT, () => {
  console.log(`we are live at .. http://localhost:${process.env.PORT}`);
});
