import { pool } from "./database.js"

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

export async function updateCard(description, id) {
    const [rows] = await pool.query(`
    UPDATE cards SET Description=? WHERE Id=?
    `, [description, id])
}

export async function deleteCard(id) {
    const [card] = await pool.query(`
    DELETE FROM cards WHERE Id=?;
    `, [id])
}