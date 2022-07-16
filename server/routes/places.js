const express = require('express');
const router = express.Router();
const {forwardAuthenticated} = require('../config/auth');

router.get('/', function (req, res, next) {
    return res.send(JSON.stringify(places));
});

router.get('/:placeId', function(req, res, next) {
    const foundPlace = places.find(place => place.placeId === req.params.placeId);

    if (!foundPlace) return res.status(404).send({ message: 'Place not found' });

    return res.send(foundPlace);
});

router.post('/', function (req, res, next) {
    if (!req.body.placeId) {
        return res.status(400).send({ message: 'PlaceId not found!' });
    }
    const place = { placeId: req.body.placeId };
    places.push(place);
    return res.send(place);
});

router.delete('/:placeId', function(req, res, next) {
    const temp = places.filter(place => place.placeId !== req.params.placeId);
    if (temp.length === places.length) return res.status(400).send({message: 'Place not found!'});
    places = temp;
    res.send({message: `The place with id: ${req.params.placeId} has been deleted.`});
});

router.delete('/', function(req, res, next) {
    places = [];
    res.send({message: 'All places has been deleted'});
});

module.exports = router;