import { pool } from "./database.js"

export async function getListByProject(id) {
    const [list] = await pool.query(`
    SELECT lists.Id, lists.Title FROM projects
    INNER JOIN lists
    ON lists.ProjectId = projects.Id 
    WHERE projects.Id=?
    `, [id])

    return list
}

export async function getProjects() {
    const [projects] = await pool.query(`
    SELECT * FROM projects
    `)

    return projects
}

export async function getProject(id) {
    const [project] = await pool.query(`
    SELECT * FROM projects WHERE Id=?
    `, [id])

    return project[0]
}