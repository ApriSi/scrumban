import { getProjects, getProject, getListByProject, createProject, renameProject, deleteProject } from "../database/projects.js"
import express from "express"

const router = express.Router()

router.get('/', async (req, res) => {
    const projects = await getProjects()
    res.json(projects)
})

router.get('/list', async (req, res) => {
    const projects = await getProjects()

    var result = [] 
    await Promise.all(projects.map(async (project) => {
        const list = await getListByProject(project.Id)
        result.push({Id: project.Id, Title: project.Title, List: list})
    })).then(() => {
        res.json(result)
    })
})

router.get('/:id', async (req, res) => {
    const project = await getProject(req.params.id)

    if(project === undefined) {
        res.send("This project doesn't exist") 
        return
    }

    res.json(project)
})

router.get('/list/:id', async (req, res) => {
    const list = await getListByProject(req.params.id)
    if(list === undefined) {
        res.send("This project doesn't exist") 
        return
    }
    res.json(list)
})

router.post('/:title/:color', async (req, res) => {
    const project = await createProject(req.params.title, req.params.color)
    res.json(project)
})

router.put('/:title/:id', async (req, res) => {
    const project = await renameProject(req.params.title, req.params.id);
    res.json(project)
})

router.delete('/:id', async (req, res) => {
    const project = await deleteProject(req.params.id)
    res.json(`project with the Id ${req.params.id} was deleted`)
})

export default router