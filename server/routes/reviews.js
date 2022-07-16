const express = require('express');
const router = express.Router();
const Review = require('../models/Review');


router.get('/', function(req, res, next) {
    const placeId = req.query.placeId;
    Review.find({placeId})
    .then((reviews)=>{
        res.send(JSON.stringify(reviews));
    })
    .catch((e)=>{
        console.log(e);
    })
});

router.post('/', function(req, res, next) {
    const placeId = req.query.placeId;
    const result = req.body;
    const newReview = new Review(result);
    newReview.save()
    .then(()=>{
        console.log("save successfully");
        Review.find({placeId})
        .then((review)=>{
            res.send(JSON.stringify(review));
        })
    })
    .catch((e)=>{
        console.log(e);
    })
});

module.exports = router;