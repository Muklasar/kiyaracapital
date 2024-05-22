const express = require('express');
const fs = require('fs');
const cors = require('cors')

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors())

app.get('/api/students', (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;

    // Read student data from JSON file
    const studentsData = JSON.parse(fs.readFileSync('./data/students.json'));

    const totalCount = studentsData.length;

    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const paginatedStudents = studentsData.slice(startIndex, startIndex + parseInt(pageSize));

    res.status(200).json({
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: parseInt(page),
      pageSize: parseInt(pageSize),
      data: paginatedStudents,
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
