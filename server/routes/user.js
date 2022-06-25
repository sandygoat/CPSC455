// const express = require('express');
// const router = express.Router();

// let users = [
//   {userId : 1}
// ];

// router.get('/', function (req, res, next) {
//   return res.send(users);
// });

// router.get('/:userId', function(req, res, next) {
//   const foundUser = users.find(user => user.userId === req.params.userId);

//   if (!foundUser) return res.status(404).send({ message: 'User not found' });

//   return res.send(foundUser);
// });

// router.post('/', function (req, res, next) {
//   if (!req.body.userId) {
//     return res.status(400).send({ message: 'User ID not found!' });
//   }
//   const user = { userId: req.body.userId };
//   users.push(user);
//   return res.send(user);
// });

// router.delete('/:userId', function(req, res, next) {
//   const temp = users.filter(user => user.userId !== req.params.userId);
//   if (temp.length === users.length) return res.status(400).send({message: 'User not found!'});
//   users = temp;
//   res.send({message: `The user with id: ${req.params.userId} has been deleted.`});
// });

// router.delete('/', function(req, res, next) {
//   users = [];
//   res.send({message: 'All users has been deleted'});
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// // Login Page
// router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// // Register Page
// router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register',forwardAuthenticated, (req, res) => {
  const { name, email, password} = req.body;
  let errors = [];

  if (!name || !email || !password) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.status(400).send({message: 'Invalid input'});
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        res.status(400).send({message: 'Email already exists'});
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.send(JSON.stringify(newUser.email));
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', forwardAuthenticated, (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.status(400).send({message: err});; }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send(JSON.stringify(user.email));
    });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
});

module.exports = router;