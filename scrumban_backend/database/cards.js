import { pool } from "./database.js"

export async function getCards() {
    const [cards] = await pool.query('SELECT * FROM cards')
    return cards
}

export async function getCardsByListId(id) {
    const [cards] = await pool.query('SELECT * FROM cards WHERE ListId=? ORDER BY Priority', [id])
    return cards
} 

export async function getCard(id) {
    const [card] = await pool.query('SELECT * FROM cards WHERE Id=?', [id])
    return card[0]
}

export async function createCard(description, listId, priority) {
    const [rows] = await pool.query(`
    INSERT INTO cards(description, listId, priority) VALUES(?, ?, ?)
    `, [description, listId, priority])

    return getCard(rows.insertId)
}

export async function updateCard(description, id) {
    const [rows] = await pool.query(`
    UPDATE cards SET Description=? WHERE Id=?
    `, [description, id])
}

export async function switchCard(listId, id, priority, currentPriority) {
    const [switched] = await pool.query(`
        UPDATE cards SET Priority=? WHERE Priority=? AND ListId=?
    `, [currentPriority, priority, listId])

    const [rows] = await pool.query(`
        UPDATE cards SET Priority=? WHERE Id=?
    `, [priority, id])
}

export async function switchCardList(id, newListId) {
    const [switched] = await pool.query(`
        CALL moveCard(?, ?)
    `, [id, newListId])
}

export async function deleteCard(id, priority, listId) {
    const [card] = await pool.query(`
    CALL deleteCards(?, ?, ?)
    `, [id, priority, listId])
}