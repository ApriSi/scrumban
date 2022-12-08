import dotenv from 'dotenv'
dotenv.config()

import mysql from 'mysql2'

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

// Lists
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

export async function createList(title) {
    const [rows] = await pool.query(`
    INSERT INTO lists (title) VALUES(?)
    `, [title])

    return getList(rows.insertId)
}

// Projects
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

// Cards
export async function getCards() {
    const [cards] = await pool.query('SELECT * FROM cards')
    return cards
}

export async function getCardsByListId(id) {
    const [cards] = await pool.query('SELECT * FROM cards WHERE ListId=?', [id])
    return cards
} 

export async function getCard(id) {
    const [card] = await pool.query('SELECT * FROM cards WHERE Id=?', [id])
    return card[0]
}

export async function createCard(description, listId) {
    const [rows] = await pool.query(`
    INSERT INTO cards(description, listId) VALUES(?, ?)
    `, [description, listId])

    return getCard(rows.insertId)
}
