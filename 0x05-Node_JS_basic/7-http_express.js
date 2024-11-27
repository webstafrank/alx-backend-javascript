const express = require('express');
const countStudents = require('./3-read_file_async');

// Create the Express app
const app = express();

// Define the root route
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Define the students route
app.get('/students', (req, res) => {
  const databaseFile = process.argv[2];

  if (!databaseFile) {
    res.status(500).send('Database file is missing');
    return;
  }

  countStudents(databaseFile)
    .then((output) => {
      res.write('This is the list of our students\n');
      res.write(output);
      res.end();
    })
    .catch(() => {
      res.status(500).send('Cannot load the database');
    });
});

// Listen on port 1245
app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

// Export the app
module.exports = app;

