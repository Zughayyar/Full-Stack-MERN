require('dotenv').config();
require('./config/mongoose.config');

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const port = process.env.PORT

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Allow React app
app.use(express.json()); // Parse JSON bodies

// Routes
require('./routes/product.routes')(app);

// Serve static files from Vite's dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all route to serve Vite's index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Listening at Port ${port}`);
});