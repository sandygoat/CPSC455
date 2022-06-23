const express = require('express');
const router = express.Router();

let users = [
  {userId : 1}
];

router.get('/', function (req, res, next) {
  return res.send(users);
});

router.get('/:userId', function(req, res, next) {
  const foundUser = users.find(user => user.userId === req.params.userId);

  if (!foundUser) return res.status(404).send({ message: 'User not found' });

  return res.send(foundUser);
});

router.post('/', function (req, res, next) {
  if (!req.body.userId) {
    return res.status(400).send({ message: 'User ID not found!' });
  }
  const user = { userId: req.body.userId };
  users.push(user);
  return res.send(user);
});

router.delete('/:userId', function(req, res, next) {
  const temp = users.filter(user => user.userId !== req.params.userId);
  if (temp.length === users.length) return res.status(400).send({message: 'User not found!'});
  users = temp;
  res.send({message: `The user with id: ${req.params.userId} has been deleted.`});
});

router.delete('/', function(req, res, next) {
  users = [];
  res.send({message: 'All users has been deleted'});
});

module.exports = router;
