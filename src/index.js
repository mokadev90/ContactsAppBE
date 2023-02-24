require('./models/User');
require('./models/Contact');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(contactRoutes);

const mongoUri =
	'mongodb+srv://admin:admin@contactapp.reeaovb.mongodb.net/?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);
mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
	console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (error) => {
	console.log('Error connecting to mongo ', error);
});

app.get('/', (req, res) => {
	res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
