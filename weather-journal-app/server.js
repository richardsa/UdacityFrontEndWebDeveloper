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
};

// project Data get route
app.get('/all', sendData);

// return project data
function sendData (request, response) {
  response.send(projectData);
};


const data = [];

app.post('/add', addData);

function addData (req,res){
    console.log(res.body);
};
