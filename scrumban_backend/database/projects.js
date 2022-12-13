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

export async function createProject(title, color) {
    const [rows] = await pool.query(`
    INSERT INTO projects(title, color) VALUES(?, ?)
    `, [title, color])

    return getProject(rows.insertId)
}

export async function renameProject(title, id) {
    const [rows] = await pool.query(`UPDATE projects SET Title = ? WHERE Id=?`, [title, id])

    return getProject(id)
}

export async function deleteProject(id) {
    const [project] = await pool.query(`DELETE FROM projects WHERE Id=?`, [id])
    const [lists] = await pool.query(`DELETE FROM lists WHERE ProjectId=?`, [id])
    const [cards] = await pool.query(`DELETE FROM cards WHERE ListId=?`, [lists.insertId])
}