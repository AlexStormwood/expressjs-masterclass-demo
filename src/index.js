// Helps emulate environment or config vars by autodetecting ".env" files and using their data.
require('dotenv').config()


const express = require('express');
// Initialize Express as an instance named "app".
const app = express();

// Separate these out in case we wanna use Docker or something to wrap the app.
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Best settings for setting up Express as an API server to receive and process JSON & form data.
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Initialize the Firebase Admin SDK
const firebaseAdmin = require('firebase-admin');
firebaseAdmin.initializeApp({credential: firebaseAdmin.credential.cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS))})


// Import the database connection function
const { databaseConnector } = require('./database');
// Establish what the database URL is going to be
const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/yourappname';
// Connect to the database using the URL
databaseConnector(DATABASE_URI).then(() => {
    console.log("Database connected successfully!");
}).catch(error => {
    console.log(`
    Some error occured connecting to the database! It was: 
    ${error}
    `)
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