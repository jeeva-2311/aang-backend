import { Request, Response } from "express";
import { ProjectService } from "../services/project.service";

export class ProjectController {
  static async create(req: Request, res: Response) {
    try {
      const project = await ProjectService.createProject(req.body);
      res.status(201).json(project);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const projects = await ProjectService.getAllProjects();
      res.json(projects);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getOne(req: Request, res: Response) {
    try {
      const project = await ProjectService.getProjectById(Number(req.params.id));
      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      res.json(project);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const project = await ProjectService.updateProject(Number(req.params.id), req.body);
      if (!project) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      res.json(project);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const success = await ProjectService.deleteProject(Number(req.params.id));
      if (!success) {
        res.status(404).json({ error: "Project not found" });
        return;
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
