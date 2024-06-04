const express = require('express')
const router = express.Router()
const posts = require('../data/posts.js')

router
    .route('/')
    .get((req, res) => {
        res.json(posts)
    })
    .post((req, res) => {
        if (req.body.name && req.body.content) {
            const newPost = {
                id: posts.length + 1,
                name: req.body.name,
                date: new Date().toLocaleString(),
                content: req.body.content
            }
            posts.push(newPost)
            res.json(newPost)
        }
        else res.send({error: 'insufficient Data'})
    })

router
   .route('/:id')
   .get((req, res, next) => {
        const post = posts.find(item => item.id == req.params.id)
        if (post) res.json(post)
        else next()
    })
    .put((req, res, next) => {
        const postToPatch = posts.find(item => item.id == req.params.id)
        if (postToPatch) {
            for (const key in req.body) {
                postToPatch[key] = req.body[key]
            }
            postToPatch.date = new Date().toLocaleString()
            res.send(postToPatch)
        }
        else next()
    })
    .delete((req, res, next) => {
        const postToDelete = posts.find(item => item.id == req.params.id)
        if (postToDelete) {
            const index = posts.indexOf(postToDelete)
            posts.splice(index, 1)
            res.send(postToDelete)
        }
        else next()
    })

module.exports = router
    