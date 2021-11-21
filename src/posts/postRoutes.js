const express = require('express');

// Create a bundle of routes. We'll export this out and then import it into src/index.js.
const routes = express.Router();

// This is the "root" route for the Router instance. 
// Its actual name in the URL will depend on how it's configured in src/index.js
routes.get('/', (request, response) => {

    response.json(`Received a request on ${request.originalUrl}`);
});

// Set up route params with the colon before the name.
routes.get('/:postID', (request, response) => {

    response.json(`Received a GET request for a post with ID of ${request.params.postID}`);

});

// Use Postman or another HTTP tool to visit a POST route.
routes.post('/:postID', (request, response) => {
    // Cleanly build a response OBJ
    let jsonResponse = {
        message:`Received a POST request for a post with ID of ${request.params.postID}`,
        receivedBody: request.body
    }

    response.json(jsonResponse);
});

module.exports = routes;