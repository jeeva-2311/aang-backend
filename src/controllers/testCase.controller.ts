import { Request, Response } from "express";
import { TestCaseService } from "../services/testCase.service";

export class TestCaseController {
    static async create(req: Request, res: Response) {
        try {
            const testCase = await TestCaseService.createTestCase(req.body);
            res.status(201).json(testCase);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllByApi(req: Request, res: Response) {
        try {
            const testCases = await TestCaseService.getTestCasesByApi(Number(req.params.apiId));
            res.json(testCases);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getOne(req: Request, res: Response) {
        try {
            const testCase = await TestCaseService.getTestCaseById(Number(req.params.id));
            if (!testCase) {
                res.status(404).json({ error: "TestCase not found" });
                return;
            }
            res.json(testCase);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const testCase = await TestCaseService.updateTestCase(Number(req.params.id), req.body);
            if (!testCase) {
                res.status(404).json({ error: "TestCase not found" });
                return;
            }
            res.json(testCase);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const success = await TestCaseService.deleteTestCase(Number(req.params.id));
            if (!success) {
                res.status(404).json({ error: "TestCase not found" });
                return;
            }
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
