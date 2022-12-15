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

export async function updateList(title, id) {
    const [rows] = await pool.query(`
    UPDATE lists SET Title=? WHERE Id=?
    `, [title, id])
}

export async function removeList(id) {
    const [list] = await pool.query(`
    DELETE FROM lists WHERE Id=?;
    `, [id])

    const [card] = await pool.query(`
    DELETE FROM cards WHERE ListId=?;
    `, [id])
}