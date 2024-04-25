var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const cookieSession = require("cookie-session");

const dbConfig = require("./app/config/db.config");

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

const cors = require("cors");

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true
  })
);



const db = require("./app/models");



const Role = db.role;

db.mongoose
  .connect(`mongodb+srv://ju3tin:grierson1979@cluster0.yudvymo.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
   // initial();
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


app.get('*', function (req, res)  {
  res.sendFile(path.join(__dirname,"/shit/404.html"));
})

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
