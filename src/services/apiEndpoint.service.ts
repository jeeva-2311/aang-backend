import { ApiEndpoint, ApiEndpointModel } from "../models/apiEndpoint.model";

export class ApiEndpointService {
    static async createEndpoint(data: ApiEndpoint): Promise<ApiEndpoint> {
        return ApiEndpointModel.create(data);
    }

    static async getEndpointsByProject(projectId: number): Promise<ApiEndpoint[]> {
        return ApiEndpointModel.findAllByProjectId(projectId);
    }

    static async getEndpointById(id: number): Promise<ApiEndpoint | null> {
        return ApiEndpointModel.findById(id);
    }

    static async updateEndpoint(id: number, data: Partial<ApiEndpoint>): Promise<ApiEndpoint | null> {
        return ApiEndpointModel.update(id, data);
    }

    static async deleteEndpoint(id: number): Promise<boolean> {
        return ApiEndpointModel.delete(id);
    }
}
