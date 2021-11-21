const express = require('express');
// Initialize Express as an instance named "app".
const app = express();

// Separate these out in case we wanna use Docker or something to wrap the app.
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Best settings for setting up Express as an API server to receive and process JSON & form data.
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('../keys/alexhexpressdemo-firebase-adminsdk-ihj1f-5a0a4272fb.json');
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});


// Standard ExpressJS route, sends back a HTML response
app.get('/', (request, response) => {

    response.send("Hello world!");
});

// API route, sends back a JSON response
app.get('/json',(request, response) => {

    response.json({'message':"Hello world!"})
});


const importedPostRouting = require('./posts/postRoutes');
app.use('/posts', importedPostRouting);


const importedUserRouting = require('./users/userRoutes');
app.use('/users', importedUserRouting);

// Run the server by making it 'listen' for network traffic
app.listen(PORT, HOST, () => {
    // Weird in-line conditional string interpolation to handle "0.0.0.0" -> "localhost" conversion
    console.log(`Hello world app listening at http://${HOST == "0.0.0.0" && "localhost"}:${PORT}/`);
});