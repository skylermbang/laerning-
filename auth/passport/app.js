const express = require('express');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const passportSetup = require('./Passport/config/passport.setup')
const mongoose = require('mongoose')
const keys = require('./key')
const cookieSession = require('cookie-session');
const passport = require('passport');


const app = express();

// set view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //1day
    keys: [keys.session.cookieKey]
}))


app.use(passport.initialize())
app.use(passport.session())

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/passport", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    ignoreUndefined: true,
}, () => { console.log("mongodb connected") })


// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});


// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.listen(8080, () => {
    console.log('app now listening for requests on port 8080');
});