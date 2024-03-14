const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('express-flash');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const kategoriRouter = require('./routes/kategori');
const mahasiswaRouter = require('./routes/mahasiswa');
const pendidikanRouter = require('./routes/pendidikan');
const keahlianRouter = require('./routes/keahlian');

const kapalRouter = require('./routes/kapal');
const alat_tangkap = require('./routes/alat_tangkap');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
    },
    store: new session.MemoryStore(),
  })
);

app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/kategori', kategoriRouter);
app.use('/mahasiswa',mahasiswaRouter)
app.use('/pendidikan', pendidikanRouter);
app.use('/keahlian', keahlianRouter);

app.use('/kapal', kapalRouter);
app.use('/alat_tangkap', alat_tangkap);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;