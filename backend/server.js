const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todo_list"
})

// Create tasks table if not exists
db.query(`CREATE TABLE IF NOT EXISTS tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`, (err, result) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Tasks table created or already exists");
    }
});


// API endpoint to get all tasks
app.get('/getTasks', (req, res) => {
    const sql = "SELECT * FROM tasks";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.json("Error");
        }
        return res.json(result);
    });
});

// API endpoint to add a new task
app.post('/addTask', (req, res) => {
    const { task } = req.body;
    const sql = "INSERT INTO tasks (task) VALUES (?)";
    db.query(sql, [task], (err, result) => {
      if (err) {
        console.error(err);
        res.json({ success: false, error: 'Failed to add task' });
      } else {
        console.log("Task added successfully");
        res.json({ success: true });
      }
    });
  });
  

app.listen(8081, () => {
    console.log("Server is running on port 8081");
});
