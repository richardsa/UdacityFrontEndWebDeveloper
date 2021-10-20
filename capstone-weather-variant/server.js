const dotenv = require('dotenv');
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);

function listening() {
  // console.log(server);
  console.log(`running on localhost: ${port}`);
  console.log(`geoNamesAPI = ${process.env.geoNamesAPI}`);
  console.log(`weatherAPI = ${process.env.weatherAPI}`);
  console.log(`pixAPI = ${process.env.pixAPI}`);
};

const axios = require('axios');

// project Data get route
app.get('/all', sendData);

// return project data
function sendData (request, response) {
  response.send(projectData);
};

// project data post route
app.post('/add', addData);

// add response to project data object
function addData (req,res){
  projectData.weatherData = req.body;
};

const baseGeoAPI = `http://api.geonames.org/searchJSON?username=${process.env.geoNamesAPI}&name=`
app.get('/cities/:city*', function (req, res) {
  let city = req.params.city
  let reqUrl = baseGeoAPI + city;
  axios.get(reqUrl)
  .then(function (response) {
    console.log(response.data)
  res.send(response.data);
  });
})
