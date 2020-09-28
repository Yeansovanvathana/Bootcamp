//Setup index.js as the default file for node and nodemon in the package.json file.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(express.json({extended:false}))

const tasklist  = require('./route/api/tasklist');
app.use('/api/my_tasklist', tasklist);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Handle production
if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public/'));
  
    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
  }

//Set up and listen to port 5000 in the index.js file.
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));

