const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating');


router.get('/', function(req, res, next) {
    const placeId = req.query.placeId;
    const userId = req.query.userId;
    Rating.findOne({placeId, userId})
    .then((rating)=>{
        res.send(JSON.stringify(rating));
    })
    .catch((e)=>{
        console.log(e);
    })
});

router.post('/', function(req, res, next) {
    const result = req.body;
    const {userId, placeId} = result;
    const newReview = new Rating(result);
    Rating.findOne({userId, placeId})
    .then((rating)=>{
        if(rating == null){
            newReview.save()
            .then(()=>{
                console.log("save successfully");
                Rating.find({userId, placeId})
                .then((rating)=>{
                    res.send(JSON.stringify(rating));
                })
            })
            .catch((e)=>{
                console.log(e);
            })
        }else{
            res.status(500).send('Already rated');
        }
    })
});


module.exports = router;