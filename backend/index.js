const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Example endpoint for getting paginated student data
app.get('/api/students', (req, res) => {
  const { page = 1, pageSize = 10 } = req.query; // Default page size is 10

  const students = [];
  let totalCount = 0;

  // Read CSV file and parse data
  fs.createReadStream('students.csv')
    .pipe(csv())
    .on('data', (row) => {
      students.push(row);
    })
    .on('end', () => {
      totalCount = students.length;

      // Apply pagination
      const startIndex = (page - 1) * pageSize;
      const paginatedStudents = students.slice(startIndex, startIndex + parseInt(pageSize));

      res.json({
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
        currentPage: parseInt(page),
        pageSize: parseInt(pageSize),
        data: paginatedStudents,
      });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
