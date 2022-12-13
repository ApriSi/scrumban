import { getLists, createList, getList, updateList } from "../database/lists.js"
import express from "express"

const router = express.Router()

router.get('/', async (req, res) => {
    const lists = await getLists()
    res.json(lists)
})

router.get('/:id', async (req, res) => {
    const list = await getList(req.params.id)

    if(list === undefined) {
        res.send("This list doesn't exist") 
        return
    }

    res.json(list)
})

router.post('/:title/:id', async (req, res) => {
    const list = await createList(req.params.title, req.params.id)
    res.json(list)
})

router.put('/:title/:id', async (req, res) => {
    const card = await updateList(req.params.title, req.params.id)
    res.json('List Updated')
})

export default router