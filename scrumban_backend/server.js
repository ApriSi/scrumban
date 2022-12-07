import express from "express"
const app = express()

import { Lists, Projects } from './routes/index.js'

app.use(express.json())

// Routes
app.use("/lists", Lists)
app.use("/projects", Projects)

app.listen(6969, () => {
    console.log('Listening to port ' + 6969)
})