require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose')

const homeRoute = require('./routes/home');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');

const authMiddleware = require('./middlewares/auth.middleware');
const upload = require('./middlewares/multer.middleware');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(methodOverride('_method'));

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));

app.use(expressLayouts);
app.set('layout', './layouts/full-width');
app.set('view engine', 'ejs');

app.use('/', homeRoute);
app.use('/auth', authRoute);
app.use('/profile', authMiddleware.requireAuth, upload, profileRoute)

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch(error => console.log(`${error} did not connect`))