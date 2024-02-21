import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';

config();

import { verifyToken } from './utilities/token.js';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

/**
 * admin route
 **/
import adminRouter from './routes/admin.route.js';
app.use('/api/v1/admin', verifyToken, adminRouter);

/**
 * auth route
 **/
import authRouter from './routes/auth.route.js';
app.use('/api/v1/auth', authRouter);

/**
 * user route
 **/
import userRoute from './routes/user.route.js';
app.use('/api/v1/user', verifyToken, userRoute);

/**
 * room route
 **/
import roomRoute from './routes/room.route.js';
app.use('/api/v1/room', verifyToken, roomRoute);

/**
 * room reservation route
 **/
import roomReservationRoute from './routes/roomResevation.route.js';
app.use('/api/v1/roomreservation', verifyToken, roomReservationRoute);

/**
 * menu route
 **/
import menuRoute from './routes/menu.route.js';
app.use('/api/v1/menu', verifyToken, menuRoute);

/**
 * resturant route
 **/
import restaurantRoute from './routes/restaurant.route.js';
app.use('/api/v1/restaurant', verifyToken, restaurantRoute);

/**
 * news route
 **/
import newsRoute from './routes/news.route.js';
app.use('/api/v1/news', verifyToken, newsRoute);

/**
 * reply route
 **/
import replyRoute from './routes/reply.route.js';
app.use('/api/v1/reply', verifyToken, replyRoute);

/**
 * clubHouse route
 **/
import clubHouseRoute from './routes/clubHouse.route.js';
app.use('/api/v1/clubHouse', verifyToken, clubHouseRoute);

/**
 * contactUs route
 **/
import contactUsRoute from './routes/contactUs.route.js';
app.use('/api/v1/contact', verifyToken, contactUsRoute);

/**
 * app settings route
 **/
import appSettingsRoute from './routes/appSettings.route.js';
app.use('/api/v1/settings', verifyToken, appSettingsRoute);

/**
 * review route
 **/
import reviewRoute from './routes/review.route.js';
app.use('/api/v1/review', verifyToken, reviewRoute);

/**
 * extra services route
 **/
import extraServicesRoute from './routes/extraServices.route.js';
app.use('/api/v1/extraservices', verifyToken, extraServicesRoute);

/**
 * faqs route
 **/
import faqsRoute from './routes/faqs.route.js';
app.use('/api/v1/faqs', verifyToken, faqsRoute);

// homeSliders route
import homeSlidersRoute from './routes/homeSliders.route.js';
app.use('/api/v1/sliders', verifyToken, homeSlidersRoute);

app.use((req, res) => {
  res.status(404).json({ message: '404: Not Found' });
});

app.listen(process.env.PORT, () => {
  console.log(`we are live at .. http://localhost:${process.env.PORT}`);
});
