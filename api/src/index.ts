// Imports
import express from 'express';
const projects = require('./routes/projects');

// Database Instantiation


// App initialization
const app = express();  

// Extensions
app.use(express.json());

// Routes & Endpoints
app.use('/projects', projects);

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});