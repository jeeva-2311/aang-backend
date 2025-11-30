import { pool } from "../db/client";

export interface Project {
    id?: number;
    name: string;
    baseUrl: string;
    createdAt?: Date;
}

export class ProjectModel {
    static async create(project: Project): Promise<Project> {
        const query = ` INSERT INTO "Project" (name, "baseUrl") VALUES ($1, $2) RETURNING *;`;
        const values = [project.name, project.baseUrl];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async findAll(): Promise<Project[]> {
        const query = `SELECT * FROM "Project" ORDER BY "createdAt" DESC;`;
        const { rows } = await pool.query(query);
        return rows;
    }

    static async findById(id: number): Promise<Project | null> {
        const query = `SELECT * FROM "Project" WHERE id = $1;`;
        const { rows } = await pool.query(query, [id]);
        return rows[0] || null;
    }

    static async update(id: number, project: Partial<Project>): Promise<Project | null> {
        const fields = Object.keys(project)
            .map((key, index) => `"${key}" = $${index + 2}`)
            .join(", ");

        if (!fields) return null;

        const query = `UPDATE "Project" SET ${fields} WHERE id = $1 RETURNING *;`;
        const values = [id, ...Object.values(project)];
        const { rows } = await pool.query(query, values);
        return rows[0] || null;
    }

    static async delete(id: number): Promise<boolean> {
        const query = `DELETE FROM "Project" WHERE id = $1;`;
        const { rowCount } = await pool.query(query, [id]);
        return (rowCount || 0) > 0;
    }
}
