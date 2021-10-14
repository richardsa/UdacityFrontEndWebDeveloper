const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

const axios = require('axios');

const cors = require('cors');
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/client/views/index.html'))
})

const baseAPI = `https://api.meaningcloud.com/sentiment-2.1&key=${process.env.API_KEY}&lang=en&url=`


var port = 8080;

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

app.get('/test/:url*', function (req, res) {
  let url = req.params.url
  let reqUrl = baseAPI + url;
  axios.get(reqUrl)
  .then(function (response) {
    console.log(response.data)
  res.send(response.data);
  });
})
