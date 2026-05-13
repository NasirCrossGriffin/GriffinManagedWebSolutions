const express = require('express')
const cors = require('cors'); // Import cors
require('dotenv').config();
const path = require('path');
const app = express()

app.use(cors());

app.use(express.json())

const mongoURL = process.env.MONGO_URL;

const mongoose = require('mongoose')

mongoose.connect((mongoURL), {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.get('/', (req, res) => {
    res.redirect('/nasirgriffin');
});

const contactRouter = require('./routes/contactroutes');

app.use('/api/contact', contactRouter);

app.use(express.static(path.join(__dirname, "build")));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3001; // Use $PORT in production, 3001 for local dev
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});