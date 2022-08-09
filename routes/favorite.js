const express = require('express');
const router = express.Router();
const {forwardAuthenticated} = require('../config/auth');
const Favorite = require("../models/Favorite.js");
const axios = require('axios');
const {Promise} = require("mongoose");

function getPhotoUrl(reference) {
    return axios.get(
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photo_reference=${reference}&key=AIzaSyA1h-RJmy66EAvQmxOOExargkvrdDRLlH4`
    ).then((result) => {
        return Promise.resolve(result.request.res.responseUrl);
    }).catch((error) => {
        console.log(error);
    })
}

function getPhotoUrls(photos) {
    let urls = [];
    photos.forEach((photo) => {
        urls.push(getPhotoUrl(photo.photo_reference));
    })
    return Promise.all(urls).then((res) => {
        return Promise.resolve(res);
    })
}

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
    .then(async (values) => {
        let placeList = [];
        for (const v of values) {
            const result = {
                placeId: v.data.result.place_id,
                geometry: v.data.result.geometry,
                name: v.data.result.name,
            }
            let photoUrls = []
            if (v.data.result.hasOwnProperty('photos')) {
                photoUrls = await getPhotoUrls(v.data.result.photos);
            }
            result.photoUrls = photoUrls;
            placeList.push(result);
        }
        Promise.all(placeList).then((places) => {
            console.log(places)
            res.send(JSON.stringify(places));
        })
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