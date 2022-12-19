import express from "express"
import cors from 'cors'
import { Lists, Projects, Cards } from './routes/index.js'

const app = express()

app.use(cors({
    origin: '*'
}));

app.use(express.json())

// Routes
app.use("/lists", Lists)
app.use("/projects", Projects)
app.use("/cards", Cards)

app.listen(6969, () => {
    console.log('Listening to port ' + 6969)
})