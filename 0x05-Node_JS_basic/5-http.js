const http = require('http');
const url = require('url');
const countStudents = require('./3-read_file_async');

// Get the database file path from the command line arguments
const databaseFile = process.argv[2];

// Create the server
const app = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  if (parsedUrl.pathname === '/') {
    // Handle the root route
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (parsedUrl.pathname === '/students') {
    // Handle the /students route
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write('This is the list of our students\n');
    
    countStudents(databaseFile)
      .then(() => {
        res.end(); // End the response after countStudents logs the output
      })
      .catch((error) => {
        res.end(error.message); // Send error message as response
      });
  } else {
    // Handle other routes (optional)
    res.statusCode = 404;
    res.end('Not Found');
  }
});

// Listen on port 1245
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

// Export the app
module.exports = app;

