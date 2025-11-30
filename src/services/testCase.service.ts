import { TestCase, TestCaseModel } from "../models/testCase.model";

export class TestCaseService {
    static async createTestCase(data: TestCase): Promise<TestCase> {
        return TestCaseModel.create(data);
    }

    static async getTestCasesByApi(apiId: number): Promise<TestCase[]> {
        return TestCaseModel.findAllByApiId(apiId);
    }

    static async getTestCaseById(id: number): Promise<TestCase | null> {
        return TestCaseModel.findById(id);
    }

    static async updateTestCase(id: number, data: Partial<TestCase>): Promise<TestCase | null> {
        return TestCaseModel.update(id, data);
    }

    static async deleteTestCase(id: number): Promise<boolean> {
        return TestCaseModel.delete(id);
    }
}
