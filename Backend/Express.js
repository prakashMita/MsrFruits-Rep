const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../msr-fruits-pro/build')));

// API routes
app.get('/api/your-endpoint', (req, res) => {
  // Your backend logic here
});

// The "catchall" handler: for any request that doesn't match API routes, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../msr-fruits-pro/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
