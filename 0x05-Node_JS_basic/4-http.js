const http = require('http');

// Create the server
const app = http.createServer((req, res) => {
  res.statusCode = 200; // Set HTTP status code
  res.setHeader('Content-Type', 'text/plain'); // Set content type to plain text
  res.end('Hello Holberton School!'); // Send response
});

// Listen on port 1245
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

// Export the app
module.exports = app;

