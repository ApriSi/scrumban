import { getLists, createList, getList } from "./database.js"

import express from "express"
const app = express()

app.use(express.json())

app.get('/lists', async (req, res) => {
    const lists = await getLists()
    res.json(lists)
})

app.get('/list/:id', async (req, res) => {
    const list = await getList(req.params.id)
    res.json(list)
})

app.post('/list/:title', async (req, res) => {
    const list = await createList(req.params.title)
    res.json(list)
})

app.listen(6969, () => {
    console.log('Listening to port ' + 6969)
})