const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const mongoose = require('mongoose');
require('./models/User');
require('./services/passport');


//connect mongo to use mongoose
mongoose.connect(keys.mongoURI);

const app = express();

/* app middleware */
//fix cors problem
app.use(cors());
//define usage of cookies
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //30 days expiried
        keys: [keys.cookieKey]
    })
);

//tells app use cookies to manage auth
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json()); //make POST req include the body to req obj
/* app middleware*/

require('./routes/authRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    /* Express will serve up production assets
     like out main.js file, or main.css file! */
    app.use(express.static('client/build'));
    /* Express will serve up the index.html file
    if it doesnt recognize the route */
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })

}

const PORT = process.env.PORT || 5000; // listen to Heroku's given port (prod), or take 5000 (dev)
app.listen(PORT);