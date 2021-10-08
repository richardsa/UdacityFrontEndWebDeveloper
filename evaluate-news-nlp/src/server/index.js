const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

const axios = require('axios');

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

const baseAPI = `https://api.meaningcloud.com/sentiment-2.1&key=${process.env.API_KEY}&lang=en&url=`
// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
    console.log(`Your API key is ${process.env.API_KEY}`);
})

app.get('/test', function (req, res) {
  let url = req.param("url");
  let reqUrl = baseAPI + url;
  console.log(reqUrl);
  axios.get(reqUrl)
  .then(function (response) {
    console.log(response.data)
  res.send(response.data);
  });
})
