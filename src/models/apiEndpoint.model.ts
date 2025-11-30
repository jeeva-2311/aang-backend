import { pool } from "../db/client";

export interface ApiEndpoint {
    id?: number;
    projectId: number;
    name: string;
    url: string;
    method: string;
    createdAt?: Date;
}

export class ApiEndpointModel {
    static async create(endpoint: ApiEndpoint): Promise<ApiEndpoint> {
        const query = `
      INSERT INTO "ApiEndpoint" ("projectId", name, url, method)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
        const values = [endpoint.projectId, endpoint.name, endpoint.url, endpoint.method];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async findAllByProjectId(projectId: number): Promise<ApiEndpoint[]> {
        const query = `SELECT * FROM "ApiEndpoint" WHERE "projectId" = $1 ORDER BY "createdAt" DESC;`;
        const { rows } = await pool.query(query, [projectId]);
        return rows;
    }

    static async findById(id: number): Promise<ApiEndpoint | null> {
        const query = `SELECT * FROM "ApiEndpoint" WHERE id = $1;`;
        const { rows } = await pool.query(query, [id]);
        return rows[0] || null;
    }

    static async update(id: number, endpoint: Partial<ApiEndpoint>): Promise<ApiEndpoint | null> {
        const fields = Object.keys(endpoint)
            .map((key, index) => `"${key}" = $${index + 2}`)
            .join(", ");

        if (!fields) return null;

        const query = `
      UPDATE "ApiEndpoint"
      SET ${fields}
      WHERE id = $1
      RETURNING *;
    `;
        const values = [id, ...Object.values(endpoint)];
        const { rows } = await pool.query(query, values);
        return rows[0] || null;
    }

    static async delete(id: number): Promise<boolean> {
        const query = `DELETE FROM "ApiEndpoint" WHERE id = $1;`;
        const { rowCount } = await pool.query(query, [id]);
        return (rowCount || 0) > 0;
    }
}
