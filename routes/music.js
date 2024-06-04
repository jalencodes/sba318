const express = require('express')
const router = express.Router()
const music = require('../data/music.js')

router 
.route('/')
.get((req, res) => {
    res.json(music)
})
.post((req, res) => {
    if (req.body.title && req.body.year && req.body.type)
        {
            const newMusic = {
                title: req.body.title,
                year: req.body.year,
                type: req.body.type,
                img_src: req.body.img_src
            }
            music.push(newMusic)
            res.json(newMusic)
        } 
    else res.json({error: 'Insufficient data'})
})


router.get('/year/:year', (req, res, next) => {
    const musicOfYear = music.filter(item => item.year == req.params.year)
    if (musicOfYear.length > 0) res.json(musicOfYear)
    else next()
})

router.get('/after/:year', (req, res, next) => {
    const musicAfterYear = music.filter(item => item.year > req.params.year)
    if (musicAfterYear) res.json(musicAfterYear)
    else next()
})

router.get('/before/:year', (req, res, next) => {
    const musicBeforeYear = music.filter(item => item.year < req.params.year)
    if (musicBeforeYear) res.json(musicBeforeYear)
    else next()
})

router
.route('/single')
.get((req, res) => {
    const singles = music.filter(item => item.type ==='single')
    if (singles) res.json(singles)
    else next()
})
.post((req, res) => {
    if (req.body.title && req.body.year) {
        const newSingle = {
            title: req.body.title,
            year: req.body.year,
            type:'single',
            img_src: req.body.img_src
        }
        music.push(newSingle)
        res.json(newSingle)
    }
})

router.get('/single/year/:year',(req, res, next) => {
    const singles = music.filter(item => item.type ==='single' && item.year == req.params.year)
    if (singles.length > 0) res.json(singles)
    else next()
})

router.route('/single/after/:year').get((req, res, next) => {
    const singles = music.filter(item => item.type ==='single' && item.year > req.params.year)
    if (singles) res.json(singles)
    else next()
})

router.route('/single/before/:year').get((req, res, next) => {
    const singles = music.filter(item => item.type ==='single' && item.year < req.params.year)
    if (singles) res.json(singles)
    else next()
})

router
.route('/album')
.get((req, res) => {
    const albums = music.filter(item => item.type ==='album')
    if (albums) res.json(albums)
    else next()
})
.post((req, res) => {
    if(req.body.title && req.body.year) {
        const newAlbum = {
            title: req.body.title,
            type: 'album',
            year: req.body.year,
            img_src: req.body.img_src
        }
        music.push(newAlbum)
        res.send(newAlbum)
    }
    else res.send({error: 'insufficient Data'})
})

router.get('/album/year/:year', (req, res, next) => {
    const albums = music.filter(item => item.type === 'album' && item.year == req.params.year)
    if (albums) res.send(albums)
    else next()
})

router.get('/album/before/:year', (req, res, next) => {
    const albums = music.filter(item => item.type === 'album' && item.year < req.params.year)
    if (albums) res.send(albums)
    else next()
})

router.get('/album/after/:year', (req, res, next) => {
    const albums = music.filter(item => item.type === 'album' && item.year > req.params.year)
    if (albums) res.send(albums)
    else next()
})


module.exports = router;