var createError = require('http-errors');
var express = require('express');
var path = require('path');
const mongoose=require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
var logger = require('morgan');
//const dotenv = require('dotenv');
const dbConfig = require("./app/config/db.config");

const db = require("./app/models");
//const db = require("../models");
const User = db.user;
const Role = db.role;

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

dotenv.config({ path: './config/config.env' })
const cookieSession = require("cookie-session");


var indexRouter = require('./routes/index');

// var usersRouter = require('./routes/users');


const DATA = [{email:"ju3tin95@gmail.com", password:"1234"}]


const cors = require("cors");

var app = express();


app.use(bodyParser.urlencoded({ extended: false })) 
app.use(cookieParser())
app.use(passport.initialize());

// Add this line below
const jwt = require('jsonwebtoken')
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};
opts.secretOrKey = 'secret';


app.use(cors());


app.use(require("./routes/index1"))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', require('./routes/auth'))

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);


passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: "https://stingray-app-n7wnk.ondigitalocean.app/googleRedirect"
},
function(accessToken, refreshToken, profile, cb) {
    //console.log(accessToken, refreshToken, profile)
    console.log("GOOGLE BASED OAUTH VALIDATION GETTING CALLED")
    return cb(null, profile)
}
));

passport.use(new FacebookStrategy({
  clientID: '378915159425595',//process.env['FACEBOOK_CLIENT_ID'],
  clientSecret: '7bd791932eaf12fbb75d0166721c0e02',//process.env['FACEBOOK_CLIENT_SECRET'],
  callbackURL: "http://localhost:5000/facebookRedirect", // relative or absolute path
  profileFields: ['id', 'displayName', 'email', 'picture']
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile)
  console.log("FACEBOOK BASED OAUTH VALIDATION GETTING CALLED")
  return cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
  console.log('I should have jack ')
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  console.log('I wont have jack shit')
  cb(null, obj);
});

//const Role = db.role;

db.mongoose
  .connect(`mongodb+srv://12345:pa55word@cluster0.x5l6q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route


// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);




// Serve the "bullshit" folder as a static directory
app.use('/', express.static(path.join(__dirname, 'bullshit')));



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,"/shit/index.html"));
})

app.get('/123', function (req, res) {
  res.send({'Hello Express':'dsda'})
})

app.get('/dude45', function (req, res) {
  res.sendFile(path.join(__dirname,"/shit/login.html"));
})

app.get('/dude1', function (req, res) {
  res.sendFile(path.join(__dirname,"/shit/loginform.html"));
})

app.get('/success', (req, res) => {
  res.send(`{'Welcome': '${req.user.email}'}`)
})

app.get('/login1/', (req, res)=>{
  res.sendFile(path.join(__dirname,"/shit/login.html"))
})




/*
app.get('/', (req, res)=>{
  res.sendFile('home.html', {root: __dirname+'/public'})
})
*/


app.get('/auth/email1/', (req, res)=>{
  res.sendFile(path.join(__dirname,"/shit/loginform.html"))
})

app.get('/auth/google',  passport.authenticate('google', { scope: ['profile','email'] }))
app.get('/auth/facebook',  passport.authenticate('facebook', {scope:'email'}))

app.post('/dude1', (req, res)=>{
 
  if(CheckUser(req.body))
  {
      let token =    jwt.sign({
          data: req.body
          }, 'secret', { expiresIn: '1h' });
      res.cookie('jwt', token)
      res.send(`Log in success ${req.body.email}`)
  }else{
      res.send('Invalid login credentials')
  }
})

app.get('/profile1', passport.authenticate('jwt', { session: false }) ,(req,res)=>{
  res.send(`THIS IS UR PROFILE MAAANNNN ${req.user.email}`)
})

app.get('/googleRedirect', passport.authenticate('google'),(req, res)=>{
  console.log('redirected', req.user)
  let user = {
      displayName: req.user.displayName,
      name: req.user.name.givenName,
      email: req.user._json.email,
      provider: req.user.provider }
  console.log(user)

  FindOrCreate(user)
  let token = jwt.sign({
      data: user
      }, 'secret', { expiresIn: '1h' });
  res.cookie('jwt', token)
 // res.send({"sd":"asdasd"})
 res.redirect("/profile");

})
app.get('/facebookRedirect', passport.authenticate('facebook', {scope: 'email'}),(req, res)=>{
  console.log('redirected', req.user)
  let user = {
      displayName: req.user.displayName,
      name: req.user._json.name,
      email: req.user._json.email,
      provider: req.user.provider }
  console.log(user)  

  FindOrCreate(user)
  let token = jwt.sign({
      data: user
      }, 'secret', { expiresIn: 60 });
  res.cookie('jwt', token)
  res.redirect('/')
})

app.get('*', function (req, res)  {
  res.sendFile(path.join(__dirname,"/shit/404.html"));
})

function FindOrCreate(user){
  if(CheckUser(user)){  // if user exists then return user
      return user
  }else{
      DATA.push(user) // else create a new user
  }
}
function CheckUser(input){
  console.log(DATA)
  console.log(input)

  for (var i in DATA) {
      if(input.email==DATA[i].email && (input.password==DATA[i].password || DATA[i].provider==input.provider))
      {
          console.log('User found in DATA')
          return true
      }
      else
       null
          //console.log('no match')
    }
  return false
}

//app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

module.exports = app;
