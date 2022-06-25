const express = require('express');
const router = express.Router();

let places = [
    {
      "hexa": "#1D1148",
      "title": "Jim Everett Memorial Park",
      "description": "Dalhousie Rd Greater Vancouver A, BC Canada",
      "image": "https://lh5.googleusercontent.com/p/AF1QipMGqq9XOv8pOSd9-6ADYUo15XIslMMl65bAJsrc=w408-h306-k-no"
    },
    {
      "hexa": "#FFCD00",
      "title": "Carolinian Forest Garden",
      "description": "6804 SW Marine Drive Vancouver, BC V6T 1Z2 Canada",
      "image": "https://lh5.googleusercontent.com/p/AF1QipNvrkqUyjEcNmu0rJaGR_kX2sn4XJoY424j3Xrz=w426-h240-k-no"
    },
    {
      "hexa": "#FF5041",
      "title": "UBC Botanical Garden",
      "description": "6804 SW Marine Dr Vancouver, BC V6T 1Z4 Canada",
      "image": "https://lh5.googleusercontent.com/p/AF1QipPrgUeA-Jy2k-OtA__KY9jplIYq7dEDHJVnRW5s=w408-h306-k-no"
    },
    {
      "hexa": "#000000",
      "title": "Food Garden",
      "description": "6804 SW Marine Drive Vancouver, BC V6T 1Z2 Canada",
      "image": "https://lh5.googleusercontent.com/p/AF1QipMXSwCBSspQGgU_vnFuqd5UAdWHFMPeFA9-c4k=w408-h306-k-no"
    }
  ]

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