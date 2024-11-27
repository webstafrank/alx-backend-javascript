const fs = require('fs').promises;

// Asynchronous function to count students
function countStudents(path) {
  return fs.readFile(path, 'utf-8')
    .then((data) => {
      // Split the file content into lines and ignore empty ones
      const lines = data.trim().split('\n');
      
      if (lines.length < 2) {
        console.log('Number of students: 0');
        return;
      }

      const studentsByField = {};
      lines.slice(1).forEach((line) => {
        const [firstname, lastname, age, field] = line.split(',');

        // Ignore invalid or empty records
        if (!firstname || !lastname || !age || !field) return;

        const trimmedField = field.trim();
        if (!studentsByField[trimmedField]) {
          studentsByField[trimmedField] = [];
        }
        studentsByField[trimmedField].push(firstname.trim());
      });

      // Calculate and log the total number of students
      const totalStudents = Object.values(studentsByField).reduce(
        (total, students) => total + students.length,
        0
      );
      console.log(`Number of students: ${totalStudents}`);

      // Log details for each field
      Object.keys(studentsByField).forEach((field) => {
        const students = studentsByField[field];
        console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
      });
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}

module.exports = countStudents;

