import { pool } from "./database.js"

export async function getLists() {
    const [lists] = await pool.query(`
    SELECT * FROM lists
    `)

    return lists
}

export async function getList(id) {
    const [list] = await pool.query(`
    SELECT * FROM lists WHERE Id=?
    `, [id])

    return list[0]
}

export async function createList(title, projectId) {
    const [rows] = await pool.query(`
    INSERT INTO lists (title, projectId) VALUES(?, ?)
    `, [title, projectId])

    return getList(rows.insertId)
}

