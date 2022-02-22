import express from "express";
import Database from "better-sqlite3";
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const db = new Database('./data.db', {
    verbose: console.log
})

const getAllMuseums = db.prepare(`SELECT * FROM museums;`)
const getAllWorks = db.prepare(`SELECT * FROM works;`)

const getMuseumById = db.prepare(`SELECT * FROM museums WHERE id=?;`)
const getWorkById = db.prepare(`SELECT * FROM works WHERE id=?;`)

const getWorkByMuseumId = db.prepare(`SELECT * FROM works WHERE museumId=?;`)

const createMuseum = db.prepare(`
INSERT INTO museums (name, city) VALUES (?, ?);`)
const createWork = db.prepare(`
INSERT INTO works (name, image, museumId) VALUES (?, ?);`)

app.get('/museums', (req,res) => {
    const museums = getAllMuseums.all()

    for(const museum of museums) {
        const works = getWorkByMuseumId.all(museum.id)
        museum.works = works
    }
    res.send(museums)
})

app.get('/works', (req, res) => {
    const works = getAllWorks.all()

    for(const work of works) {
        const museum = getMuseumById.get(work.museumId)
        work.museum = museum
    }
    res.send(works)
})

app.get('/works/:id', (req, res) => {
    const id = req.params.id
    const work = getWorkById.get(id)

        const museum = getMuseumById.get(work.museumId)
        work.museum = museum

    res.send(work)
})

app.get('/museums/:id', (req, res) => {
    const id = req.params.id
    const museum = getMuseumById.get(id)

        const works = getWorkByMuseumId.all(museum.id)
        museum.works = works
        
    res.send(museum)
})

app.post('/museums', (req, res) => {
    const errors = []
    const { name, city } = req.body

    if (typeof req.body.name !== 'string') errors.push('Name missing or not a string')
    if (typeof req.body.city !== 'string') errors.push('City missing or not a string')

    if(errors.length === 0) {
        const result = createMuseum.run(name, city)
        const newMuseum = getMuseumById.get(Number(result.lastInsertRowid))
        res.status(201).send(newMuseum)
    } else {
        res.status(400).send({ errors: errors })
    }
})

app.post('/works', (req, res) => {
    const errors = []
    const { name, image, museumId } = req.body

    if (typeof req.body.name !== 'string') errors.push('Name missing or not a string')
    if (typeof req.body.city !== 'string') errors.push('City missing or not a string')
    if (typeof req.body.museumId !== 'number') errors.push('museumId missing or not a number')

    if(errors.length === 0) {
        const result = createWork.run(name, image, museumId)
        const newWork = getWorkById.get(Number(result.lastInsertRowid))
        res.status(201).send(newWork)
    } else {
        res.status(400).send({ errors: errors })
    }
})

app.listen(4000, () => console.log('Listening on port 4000'))
