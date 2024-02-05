const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/', (req, res) => {
	return res.json({
		message: 'we are live'
	});
});

const adminRouter = require('./routes/admin.route');
app.use('/api/v1/admin', adminRouter)

app.listen(process.env.PORT, () => {
	console.log(`${process.env.PORT}`);
});
