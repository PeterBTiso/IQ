if(process.env.NODE_ENV !== 'production' ){
    require('dotenv').config();
}

// this can be used as boilerplate
const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressErrors');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

//const dbUrl = process.env.DB_URL; // this is for when we want to conenct to the mongoAtlas db
const MongoDBStore = require('connect-mongo')(session);

const usersRoute = require('./routes/users');

const studentsRoute = require('./routes/students');
const subjectAssesmentsRoute = require('./routes/subjectAssesments');
// const aboutRoute = require('./routes/about');

// 'mongodb://localhost:27017/schoolapp'
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/schoolapp';
//dbUrl, // use this when wanting to coonect to mongoAtlas Data Base
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database Connected')
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// app.use(express.static('public')); // serves all files in public folder as static/shared
// app.use(express.json()); // this is to parse any json data payloads

app.use(express.urlencoded({ extended: true }));// use middleware to parse body as urlencoded data for form data
app.use(methodOverride('_method'));
app.use(express.static(path.join( __dirname ,'public')));
app.use(mongoSanitize({
    replaceWith: '_'
}));

const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

const store = new MongoDBStore({
    url: dbUrl,
    secret,
    toucAfter: 24 * 60 * 60
})

store.on("error", function (e){
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store,
    name: "session",
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig))
app.use(flash());
app.use(helmet());

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://unpkg.com",
    "https://www.npmjs.com"
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://unpkg.com",
    "https://www.npmjs.com"
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
    
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/data-james/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/',usersRoute);
app.use('/students', studentsRoute);
app.use('/students/:id/subjectAssesments', subjectAssesmentsRoute);
app.use('/students/assesments',studentsRoute); // new route for studentAssesments view

app.get('/about', (req, res) => {
    res.render('about/index')
});

app.get('/', (req, res) => {
    res.render('home')
});

app.all('*',( req, res, next) => {
    next(new ExpressError('Page not found!!!',404));
});

// for if the client enters a non number value in an input field
app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Something went wrong';
    res.status(statusCode).render('error', {err});
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})

// DISPLAY OF HOW THE DATA IS STORED
// {   "_id" : ObjectId("5fee8698ed606f094c49ea05"),
//     "subjectAssesments" : [    
//         ObjectId("5fee91f6c9d07b0a6b3a40df"),
//         ObjectId("5fee9adac9d07b0a6b3a40e2"),
//         ObjectId("5feea3a8c9d07b0a6b3a40e3") 
//         ],
//     "firstN" : "Piseth",
//     "lastN" : "Heng",
//     "admin" : ObjectId("5fe97bad0720851eef7fe061"),
//     "image" : "https://images.unsplash.com/photo-1577409873799-29f8be1311dd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
//     "age" : 7,
//     "__v" : 8,
//     "address" : "Cambodia Siem Reap",
//     "description" : "Smart and curious, but works slow and needs to be reminded to work and not play.",
//     "dob" : "2013 June 16",
//     "gender" : "Male",
//     "level" : 2,
//     "nationality" : "Khmer",
//     "siblings" : "1",
//     "title" : "Mr" 
// }
