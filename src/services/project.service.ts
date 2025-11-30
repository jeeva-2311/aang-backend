import { Project, ProjectModel } from "../models/project.model";

export class ProjectService {
    static async createProject(data: Project): Promise<Project> {
        // Add any validation or business logic here
        return ProjectModel.create(data);
    }

    static async getAllProjects(): Promise<Project[]> {
        return ProjectModel.findAll();
    }

    static async getProjectById(id: number): Promise<Project | null> {
        return ProjectModel.findById(id);
    }

    static async updateProject(id: number, data: Partial<Project>): Promise<Project | null> {
        return ProjectModel.update(id, data);
    }

    static async deleteProject(id: number): Promise<boolean> {
        return ProjectModel.delete(id);
    }
}
