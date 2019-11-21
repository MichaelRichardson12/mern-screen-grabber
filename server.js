const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const screenshot = require('./routes/api/screenshot');

const app = express();

// Root directory
global.__basedir = __dirname;

// Body parser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Use routes
app.use('/api/screenshot', screenshot);
// app.use(express.static('screenshots'));
app.use('/screenshots', express.static(path.join(__dirname, 'screenshots')))


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
