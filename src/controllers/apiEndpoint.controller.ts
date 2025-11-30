import { Request, Response } from "express";
import { ApiEndpointService } from "../services/apiEndpoint.service";

export class ApiEndpointController {
    static async create(req: Request, res: Response) {
        try {
            const endpoint = await ApiEndpointService.createEndpoint(req.body);
            res.status(201).json(endpoint);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllByProject(req: Request, res: Response) {
        try {
            const endpoints = await ApiEndpointService.getEndpointsByProject(Number(req.params.projectId));
            res.json(endpoints);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getOne(req: Request, res: Response) {
        try {
            const endpoint = await ApiEndpointService.getEndpointById(Number(req.params.id));
            if (!endpoint) {
                res.status(404).json({ error: "Endpoint not found" });
                return;
            }
            res.json(endpoint);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const endpoint = await ApiEndpointService.updateEndpoint(Number(req.params.id), req.body);
            if (!endpoint) {
                res.status(404).json({ error: "Endpoint not found" });
                return;
            }
            res.json(endpoint);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const success = await ApiEndpointService.deleteEndpoint(Number(req.params.id));
            if (!success) {
                res.status(404).json({ error: "Endpoint not found" });
                return;
            }
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
