const express = require('express');
const router = express.Router();
const {forwardAuthenticated} = require('../config/auth');
const Favorite = require("../models/Favorite.js");
const axios = require('axios');

const googleMaprequestor= (arrOfId, res) => {
    // axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${arrOfId[0].placeId}&key=AIzaSyA1h-RJmy66EAvQmxOOExargkvrdDRLlH4`)
    // .then(res=>{
    //     console.log(res.data);
    //     return res.json()
    // })
    // .then(res=>{
    //     console.log(res)
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })
    let promiseList = [];
    arrOfId.forEach((a)=>{
        promiseList.push(axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${a.placeId}&key=AIzaSyA1h-RJmy66EAvQmxOOExargkvrdDRLlH4`))
    })
    Promise.all(promiseList)
    .then((values)=>{
        res.send(JSON.stringify(values.map((v)=>v.data)));
    })
}

router.post('/', function(req, res, next) {
    const userId = req.body.userId;
    const result = req.body;
    const newFavorite = new Favorite(result);
    newFavorite.save()
        .then(()=>{
            console.log("save successfully");
            Favorite.find({userId})
                .then((favorite)=>{
                    googleMaprequestor(favorite, res);
                })
        })
        .catch((e)=>{
            console.log(e);
        })
});

router.delete(`/`, function(req, res, next) {
    const placeId = req.query.placeId;
    const userId = req.body.userId;
    Favorite.deleteOne({placeId, userId})
        .then(()=>{
            console.log("delete successfully");
            Favorite.find({userId})
                .then((favorite)=>{
                    googleMaprequestor(favorite, res);
                })
        })
        .catch((e)=>{
            console.log(e);
        })
});

router.get('/', function(req, res, next) {
    const userId = req.query.id;
    Favorite.find({userId})
        .then((favorites)=>{
            console.log("load successfully");
            console.log(favorites)
            googleMaprequestor(favorites, res);
            
        })
        .catch((e)=>{
            console.log(e);
        })
});
module.exports = router;