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

const getMuseumById = db.prepare(`SELECT * FROM museums WHERE id=?`)
const getWorkByMuseumId = db.prepare(`SELECT * FROM works WHERE museumId=?`)

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

app.listen(4000, () => console.log('Listening on port 4000'))
