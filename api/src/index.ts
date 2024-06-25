import express from 'express';

const app = express();  
app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello, Typescript + Node.js + Express");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});