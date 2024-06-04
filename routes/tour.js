 const express = require('express')
 const router = express.Router()
 const tour = require('../data/tour.js')

router
    .route('/')
    .get((req, res) => {
        res.json(tour)
    })
    .post((req, res) => {
        if (req.body.city && req.body.date && req.body.venue) {
            const concert = req.body
            concert.id = tour.length + 1
            tour.push(concert)
            res.json(concert)
        }
    })

router
    .route('/:id')
    .get((req, res, next) => {
        const concert = tour.find(item => item.id == req.params.id)
        if (concert) res.json(concert)
        else next()
    })
    .put((req, res, next) => {
        const concertToPatch = tour.find(item => item.id == req.params.id)
        if (concertToPatch) {
            for (const key in req.body) {
                concertToPatch[key] = req.body[key]
            }
            res.send(concertToPatch)
        }
        else next()
    })
    .delete((req, res, next) => {
        const concertToDelete = tour.find(item => item.id == req.params.id)
        if (concertToDelete) {
            const index = tour.indexOf(concertToDelete)
            tour.splice(index, 1)
            res.send(concertToDelete)
        }
        else next()
    })

module.exports = router