import { pool } from "../db/client";

export interface TestCase {
    id?: number;
    apiId: number;
    name: string;
    requestBody?: any;
    headers?: any;
    expectedStatus?: number;
    expectedBody?: any;
    lastRunAt?: Date;
    result?: string;
    url?: string;
}

export class TestCaseModel {
    static async create(testCase: TestCase): Promise<TestCase> {
        const query = `
      INSERT INTO "TestCase" ("apiId", name, "requestBody", headers, "expectedStatus", "expectedBody", url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
        const values = [
            testCase.apiId,
            testCase.name,
            JSON.stringify(testCase.requestBody),
            JSON.stringify(testCase.headers),
            testCase.expectedStatus,
            JSON.stringify(testCase.expectedBody),
            testCase.url
        ];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async findAllByApiId(apiId: number): Promise<TestCase[]> {
        const query = `SELECT * FROM "TestCase" WHERE "apiId" = $1 ORDER BY id DESC;`;
        const { rows } = await pool.query(query, [apiId]);
        return rows;
    }

    static async findById(id: number): Promise<TestCase | null> {
        const query = `SELECT * FROM "TestCase" WHERE id = $1;`;
        const { rows } = await pool.query(query, [id]);
        return rows[0] || null;
    }

    static async update(id: number, testCase: Partial<TestCase>): Promise<TestCase | null> {
        const fields = Object.keys(testCase)
            .map((key, index) => `"${key}" = $${index + 2}`)
            .join(", ");

        if (!fields) return null;

        const values = [id, ...Object.values(testCase).map(val =>
            (typeof val === 'object' && val !== null && !(val instanceof Date)) ? JSON.stringify(val) : val
        )];

        const query = `
      UPDATE "TestCase"
      SET ${fields}
      WHERE id = $1
      RETURNING *;
    `;

        const { rows } = await pool.query(query, values);
        return rows[0] || null;
    }

    static async delete(id: number): Promise<boolean> {
        const query = `DELETE FROM "TestCase" WHERE id = $1;`;
        const { rowCount } = await pool.query(query, [id]);
        return (rowCount || 0) > 0;
    }
}
