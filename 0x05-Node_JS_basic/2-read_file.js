const fs = require('fs');

// Function to count students and categorize them by field
function countStudents(path) {
  let data;
  try {
    // Attempt to read the CSV file synchronously
    data = fs.readFileSync(path, 'utf-8');
  } catch (err) {
    // Throw an error if the file cannot be read
    throw new Error('Cannot load the database');
  }

  // Split the data into lines and remove any empty lines
  const lines = data.trim().split('\n');

  // Initialize an object to hold the student data by field
  const studentsByField = {};

  // Process each line except the header
  lines.slice(1).forEach((line) => {
    const [firstname, lastname, age, field] = line.split(',');

    // Ignore invalid lines (e.g., if any value is missing)
    if (!firstname || !lastname || !age || !field) return;

    // Trim the fields to remove any extra spaces
    const trimmedField = field.trim();

    // Add student to the corresponding field in the object
    if (!studentsByField[trimmedField]) {
      studentsByField[trimmedField] = [];
    }
    studentsByField[trimmedField].push(firstname.trim());
  });

  // Get the total number of students
  const totalStudents = Object.values(studentsByField).reduce(
    (total, students) => total + students.length,
    0
  );

  // Log the total number of students
  console.log(`Number of students: ${totalStudents}`);

  // Log the number of students in each field along with their names
  Object.keys(studentsByField).forEach((field) => {
    const students = studentsByField[field];
    console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
  });
}

module.exports = countStudents;

