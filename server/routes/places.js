const express = require('express');
const router = express.Router();
const {forwardAuthenticated} = require('../config/auth');
const Favorite = require("../models/Favorite");

router.post('/favorite', function(req, res, next) {
    const userId = req.body.userId;
    const result = req.body;
    const newFavorite = new Favorite(result);
    newFavorite.save()
        .then(()=>{
            console.log("save successfully");
            Favorite.find({userId})
                .then((favorite)=>{
                    res.send(JSON.stringify(favorite));
                })
        })
        .catch((e)=>{
            console.log(e);
        })
});

router.delete(`/favorite/:placeId`, function(req, res, next) {
    const placeId = req.params.placeId;
    const userId = req.body.userId;
    Favorite.deleteOne({placeId})
        .then(()=>{
            console.log("delete successfully");
            Favorite.find({userId})
                .then((favorite)=>{
                    res.send(JSON.stringify(favorite));
                })
        })
        .catch((e)=>{
            console.log(e);
        })
});

router.get('/favorite', function(req, res, next) {
    const userId = req.body.userId;
    Favorite.find({userId})
        .then((favorites)=>{
            console.log("load successfully");
            res.send(JSON.stringify(favorites));
        })
        .catch((e)=>{
            console.log(e);
        })
});
module.exports = router;