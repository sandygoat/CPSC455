var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./config/config.js');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { Server } = require("socket.io");
const http = require('http');
const mongoose = require('mongoose');
const Subscribe = require('./models/Subscribe');
const redis = require('redis');
const connectRedis = require('connect-redis');
const session = require('express-session');

const server = http.createServer(app);
const io = new Server(server);

var app = express();

const RedisStore = connectRedis(session)
const redisClient = redis.createClient({
    host: config.redis.host,
    port: config.redis.port,
    legacyMode: true,
})
redisClient.connect().then(res=>console.log("connected to redis")).catch(console.error);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var amqp = require('amqplib/callback_api');

async function consumeMessage(){
    amqp.connect('amqp://localhost',async (err, connection)=>{
        const channel = await connection.createChannel();
        await channel.assertExchange('rating', 'fanout');
        channel.assertQueue('', {exclusive: true}, function(err, q) {
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            channel.bindQueue(q.queue, 'rating', '');
    
            channel.consume(q.queue, function(msg) {
                const result = JSON.parse(msg.content.toString());
                Subscribe.find({contentPoster: result.userId})
                .then((receivers)=>{
                    // 从redis里面拿socketID
                    receivers.forEach(async(receiver)=>{
                        redisClient.get(receiver._doc.subscriber,(err, socketId)=>{
                            if(!socketId) return;
                            io.sockets.sockets.get(socketId).emit('message', result);
                            channel.ack(msg);
                        });
                    })
                })
                .catch((e)=>{
                    console.log(e)
                })
            });
        });
    });
}

consumeMessage();

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('login',(userId)=>{
        //一旦连接，就把用户id和socketid存入
        redisClient.set(userId, socket.id);
    })
    socket.on('logout',(userId)=>{
        redisClient.del(userId);
    })
    socket.on('rating',(data)=>{
      console.log(data);
    })
  });
  
  
  
  server.listen(8080, () => {
    console.log('listening on *:3000');
  });
  

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

mongoose
.connect(
config.database,
{ useNewUrlParser: true ,useUnifiedTopology: true}
)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

module.exports = app;
