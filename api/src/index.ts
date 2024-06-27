// Imports
import express from 'express';
import projects from './routes/projects';

// App initialization
const app = express();  

// Extensions
app.use(express.json());

// Routes & Endpoints
app.use('/api/projects', projects);

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});