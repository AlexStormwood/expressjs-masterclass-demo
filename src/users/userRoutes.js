const express = require('express');

const routes = express.Router();

const {signUpUser, signInUser, validateUserSession} = require ('./userFunctions');

// Create a user, a session token & a refresh token
routes.post('/sign-up', async (request, response) => {
    // Process posted form/json data
    let newUserDetails = {
        email: request.body.email,
        password: request.body.password,
        displayName: request.body.username
    }
    // Ideally perform validation on those properties before moving on.

    // Hand data to a sign-up function
    let signUpResult = await signUpUser({email:newUserDetails.email, password:newUserDetails.password});
    // Return error or token as response
    if (signUpResult.error != null){
        console.log("Stopping the signup process due to an error. See logs for details.");
        response.json(signUpResult);
        return;
    }

    // Sign in to get latest user claims (authorization).
    let signInResult = await signInUser({email:newUserDetails.email, password:newUserDetails.password});
    
    // If an error message exists, return that.
    if (signInResult.error != null){
        console.log("Stopping the signup process due to an error. See logs for details.");
        response.json(signInResult);
        return;
    }

    // On success, return a signed-in session to the brand-new user:
    response.json(signInResult);

});

// Create a session token & refresh token
routes.post('/sign-in', async (request, response) => {
    // Process posted form/json data
    let userDetails = {
        email: request.body.email,
        password: request.body.password,
        displayName: request.body.username
    }
    // Ideally perform validation on those properties before moving on.

    // Hand data to a sign-in function
    let signInResult = await signInUser({email:userDetails.email, password:userDetails.password});
    
    // If an error message exists, return that.
    if (signInResult.error != null){
        console.log("Stopping the signup process due to an error. See logs for details.");
        response.json(signInResult);
        return;
    }

    // On success, return a signed-in session to the brand-new user:
    response.json(signInResult);
});

// Create a session token & refresh token
routes.post('/validate-session', async (request, response) => {
    // Process posted form/json data
    let sessionDetails = {
        idToken: request.body.idToken,
        refreshToken: request.body.refreshToken,
    }

    // Hand data to a validation function
    let validationResult = await validateUserSession({refreshToken: sessionDetails.refreshToken, idToken:sessionDetails.idToken})
    
    // Return error or token as response
    response.json(validationResult);

});

module.exports = routes;
