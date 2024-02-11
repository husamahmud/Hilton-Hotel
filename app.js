import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';

config();

const app = express()

app.use(json());
app.use(urlencoded({extended: false}));


// app.use('/', (req, res) => {
// 	return res.json({
// 		message: 'we are live'
// 	});
// });

// TODO handle not found

import adminRouter from './routes/admin.route.js';
app.use('/api/v1/admin', adminRouter)

import authRouter from './routes/auth.route.js';
app.use('/api/v1/auth', authRouter)

app.listen(process.env.PORT, () => {
	console.log(`we are live at .. http://localhost:${process.env.PORT}`);
});

// http://localhost:3000/api/v1/admin
