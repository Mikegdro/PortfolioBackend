// Imports
import express from "express";
import projects from "./routes/projects";

import { corsMiddleware } from "./middleware/cors";
import { executeMigrations } from "./db/migrate";

// Initalization message
console.log("Initializing server...");

// Migrations
executeMigrations();

// App initialization
const app = express();
app.use(express.json());
app.use(corsMiddleware);
app.disable("x-powered-by");

// Routes & Endpoints
app.use("/api/projects", projects);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
