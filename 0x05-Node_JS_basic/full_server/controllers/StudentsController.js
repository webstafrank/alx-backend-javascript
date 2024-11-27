import readDatabase from '../utils';

class StudentsController {
  static async getAllStudents(req, res) {
    const databaseFile = process.argv[2];
    try {
      const data = await readDatabase(databaseFile);
      const responseLines = ['This is the list of our students'];
      Object.keys(data)
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        .forEach((field) => {
          responseLines.push(
            `Number of students in ${field}: ${data[field].length}. List: ${data[field].join(', ')}`
          );
        });

      res.status(200).send(responseLines.join('\n'));
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const databaseFile = process.argv[2];
    const { major } = req.params;
    if (!['CS', 'SWE'].includes(major)) {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const data = await readDatabase(databaseFile);
      res.status(200).send(`List: ${data[major].join(', ')}`);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}

export default StudentsController;

