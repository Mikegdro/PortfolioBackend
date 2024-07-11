import express from "express";
import * as projectService from "../services/projectService";

import { AuthMiddleware } from "../middleware/auth";

const router = express.Router();

// Retrieves ALL projects
router.get("/", projectService.getProjects);

// Retrieves one project
router.get("/:id", projectService.getProjectById);

// Adds a project
router.post("/", AuthMiddleware, projectService.createProjectWithChildren);

export default router;
