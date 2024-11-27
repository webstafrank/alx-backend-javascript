// Import the readline module
const readline = require('readline');

// Create a readline interface for input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Display the initial prompt to the user
rl.question('Welcome to Holberton School, what is your name?\n', (name) => {
  // Display the user's name
  console.log(`Your name is: ${name}`);

  // Close the readline interface and display the closing message
  rl.close();
  console.log('This important software is now closing');
});

