import { createCard, deleteCard, getCard, getCards, getCardsByListId, switchCard, switchCardList, updateCard } from "../database/cards.js"
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


router.post('/:description/:listId/:priority', async (req, res) => {
    const card = await createCard(req.params.description, req.params.listId, req.params.priority)
    res.json(card)
})

router.put('/:description/:cardId', async (req, res) => {
    const card = await updateCard(req.params.description, req.params.cardId)
    res.json('Card Updated')
})

router.put('/switch/:id/:listId/:priority/:currentPriority', async (req, res) => {
    const card = await switchCard(req.params.listId, req.params.id, req.params.priority, req.params.currentPriority)
    res.json('Cards switched')
})

router.put('/changeList/:id/:newList', async (req, res) => {
    const card = await switchCardList(req.params.id, req.params.newList)
    res.json('Cards switched')
})

router.delete('/:id', async (req, res) => {
    const card = await getCard(req.params.id)
    const deletedCard = await deleteCard(req.params.id, card.Priority, card.ListId)
    res.json(`card deleted ${card}`)
})

export default router