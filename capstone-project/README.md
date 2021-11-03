# Richard Saldivar Weather-Journal App Project

## Table of Contents

* [Description](#description)
* [Installation Instructions](#installation_instructions)

## Description

This project was completed for the Udacity Front End Developer program. It demonstrates an asynchronous web app that uses Web API and user data to dynamically update the UI.

This project utilizes the following three APIs:

- [Weatherbit](https://www.weatherbit.io/account/create)
- [Pixabay](https://pixabay.com/api/docs/)
- [Geonames](http://www.geonames.org/export/web-services.html)

# Installation Instructions

First, clone or download this [repository](https://github.com/richardsa/UdacityFrontEndWebDeveloper/archive/refs/heads/main.zip) (git clone https://github.com/username/UdacityFrontEndWebDeveloper.git for example)

Then change your directory to this project:

cd UdacityFrontEndWebDeveloper/capstone-project

Create a .env file in the root directory of this project (UdacityFrontEndWebDeveloper/capstone-project) and add your API keys for [Weatherbit](https://www.weatherbit.io/account/create), [Pixabay](https://pixabay.com/api/docs/), and [Geonames](http://www.geonames.org/export/web-services.html) as follows:

- geoNamesAPI=YOUR_APIKEY
- weatherAPI=YOUR_APIKEY
- pixAPI=YOUR_APIKEY


Next run the following commands:

- npm install
- npm run build-prod
- npm run start

Now you can access the site at [http://localhost:3000/](http://localhost:3000/)

To run the jest tests, run the following command:

- npm run test

