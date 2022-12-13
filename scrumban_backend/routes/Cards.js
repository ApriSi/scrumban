import { createCard, getCard, getCards, getCardsByListId, updateCard } from "../database/cards.js"
import express from "express"

const router = express.Router()

router.get('/', async (req, res) => {
    const cards = await getCards()
    res.json(cards)
})

router.get('/:id', async (req, res) => {
    const card = await getCard(req.params.id)
    res.json(card)
})

router.get('/list/:id', async (req, res) => {
    const cards = await getCardsByListId(req.params.id)
    res.json(cards)
})


router.post('/:description/:listId', async (req, res) => {
    const card = await createCard(req.params.description, req.params.listId)
    res.json(card)
})

router.put('/:description/:cardId', async (req, res) => {
    const card = await updateCard(req.params.description, req.params.cardId)
    res.json('Card Updated')
})
export default router