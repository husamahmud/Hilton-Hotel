import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';

config();

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

/**
 * admin route
 **/
import adminRouter from './routes/admin.route.js';
app.use('/api/v1/admin', adminRouter);

/**
 * auth route
 **/
import authRouter from './routes/auth.route.js';
app.use('/api/v1/auth', authRouter);

/**
 * user route
 **/
import userRoute from './routes/user.route.js';
app.use('/api/v1/user', userRoute);

/**
 * room route
 **/
import roomRoute from './routes/room.route.js';
app.use('/api/v1/room', roomRoute);

/**
 * room reservation route
 **/
import roomReservationRoute from './routes/roomResevation.route.js';
app.use('/api/v1/roomreservation', roomReservationRoute);

/**
 * menu route
 **/
import menuRoute from './routes/menu.route.js';
app.use('/api/v1/menu', menuRoute);

/**
 * resturant route
 **/
import restaurantRoute from './routes/restaurant.route.js';
app.use('/api/v1/restaurant', restaurantRoute);

/**
 * news route
 **/
import newsRoute from './routes/news.route.js';
app.use('/api/v1/news', newsRoute);

/**
 * reply route
 **/
import replyRoute from './routes/reply.route.js';
app.use('/api/v1/reply', replyRoute);

/**
 * clubHouse route
 **/
import clubHouseRoute from './routes/clubHouse.route.js';
app.use('/api/v1/clubHouse', clubHouseRoute);


import contactUsRoute from './routes/contactUs.route.js';
app.use('/api/v1/contact', contactUsRoute);

// app settings
import appSettingsRoute from './routes/appSettings.route.js';
app.use('/api/v1/settings', appSettingsRoute);

// review
import reviewRoute from './routes/review.route.js';
app.use('/api/v1/review', reviewRoute);

// extra services
import extraServicesRoute from './routes/extraServices.route.js';
app.use('/api/v1/extraservices', extraServicesRoute);

app.use((req, res) => {
  res.status(404).json({ message: '404: Not Found' });
});

app.listen(process.env.PORT, () => {
  console.log(`we are live at .. http://localhost:${process.env.PORT}`);
});
