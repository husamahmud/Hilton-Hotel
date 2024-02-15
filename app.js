import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';

config();

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

// TODO handle not found 404

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

app.listen(process.env.PORT, () => {
  console.log(`we are live at .. http://localhost:${process.env.PORT}`);
});
