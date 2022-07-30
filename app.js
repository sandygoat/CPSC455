var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const morgan = require('morgan'); // 命令行log显示
const mongoose = require('mongoose');
const passport = require('passport');// 用户认证模块passport
const Strategy = require('passport-http-bearer').Strategy;// token验证模块
const session = require('express-session');
// const redis = require('redis');
// const connectRedis = require('connect-redis');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var placesRouter = require('./routes/places');
var reviewsRouter = require('./routes/reviews');
var favoriteRouter = require('./routes/favorite');
const config = require('./config/config.js');
var cors = require('cors')


var app = express();

app.use(express.static(path.join(__dirname, 'front-end/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/front-end/build/index.html'))
})

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS','HEAD'],
  allowHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}
app.use(cors(corsOptions))

//passport config
require('./config/passport')(passport);

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method' )
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
//     res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
//     next();
//   });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(passport.initialize());// 初始化passport模块
app.use(passport.session());
app.use(morgan('dev'));// 命令行中显示程序运行日志,便于bug调试==




// Redis
// const RedisStore = connectRedis(session)
// const redisClient = redis.createClient({
//     host: config.redis.host,
//     port: config.redis.port,
//     legacyMode: true,
// })
// redisClient.connect().then(res=>console.log("connected to redis")).catch(console.error);


app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
      cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
    }
    })
  );

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reviews', reviewsRouter);
app.use('/places', placesRouter);
app.use('/favorite', favoriteRouter);


mongoose
.connect(
config.database,
{ useNewUrlParser: true ,useUnifiedTopology: true}
)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));



module.exports = app;
