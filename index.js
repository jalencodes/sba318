const express = require('express');
const bodyParser = require('body-parser');
const music = require('./routes/music.js');
const posts = require('./routes/posts.js');
const tour = require('./routes/tour.js');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use((req, res, next) => {
    const time = new Date();
    console.log(
        `-----
    ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
    );
    if (Object.keys(req.body).length > 0) {
      console.log("Containing the data:");
      console.log(`${JSON.stringify(req.body)}`);
    }
    next();
  });

app.use('/api/music', music);
// app.use('/api/posts', posts);
// app.use('/api/tour', tour);

app.get('/', (req, res) => {
    res.send('Welcome to our API!')
});

app.listen(port, () => { 
    console.log(`Server listening on port: ${port}.`);
});
