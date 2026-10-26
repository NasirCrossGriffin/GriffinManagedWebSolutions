const express = require('express')
const cors = require('cors'); // Import cors
require('dotenv').config();
const path = require('path');
const app = express();
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const session_secret = process.env.SESSION_SECRET

app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://griffinmanagedwebsolutions.com',
        'https://www.griffinmanagedwebsolutions.com'
    ],
    credentials: true
}));

app.use(express.json())

const mongoURL = process.env.MONGO_URL;

const mongoose = require('mongoose')

mongoose.connect((mongoURL), {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(
    session({
        secret: session_secret, // Replace with a secure secret
        resave: false, // Don't save session if it wasn't modified
        saveUninitialized: false, // Don't create a session until something is stored
        cookie: {
            httpOnly: true, // Prevent JavaScript access to cookies
            secure: false, // Set to true if using HTTPS
            sameSite: 'Lax', // Allow cross-origin cookies
            maxAge: 1000 * 60 * 60 * 24, // 1-day expiration
        },
        store: MongoStore.create({
            mongoUrl: mongoURL, // Replace with your MongoDB URI
            collectionName: 'sessions',
        }),
    })
);

const contactRouter = require('./routes/contactroutes');
const teamMemberRouter = require('./routes/teammemberroutes')
const roleRouter = require('./routes/roleroutes')
const shiftRouter = require('./routes/shiftroutes')
const punchRouter = require('./routes/punchroutes')
const leadRouter = require('./routes/leadroutes')

app.use('/api/contact', contactRouter);
app.use('/api/team', teamMemberRouter);
app.use('/api/role', roleRouter);
app.use('/api/shift', shiftRouter);
app.use('/api/punch', punchRouter);
app.use('/api/lead', leadRouter);

app.use(express.static(path.join(__dirname, "build")));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3001; // Use $PORT in production, 3001 for local dev
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
