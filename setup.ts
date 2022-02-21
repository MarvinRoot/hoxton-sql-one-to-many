import Database from "better-sqlite3";
import { museums, works } from "./helperFiles/data";

const db = new Database('./data.db', {
    verbose: console.log
})

const dropMuseums = db.prepare(`DROP TABLE IF EXISTS museums;`)
const dropWorks = db.prepare(`DROP TABLE IF EXISTS works;`)
dropWorks.run()
dropMuseums.run()

const createMuseumsTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS museums(
        id INTEGER,
        name TEXT NOT NULL,
        city TEXT NOT NULL,
        PRIMARY KEY(id)
    );`
)

const createWorksTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS works(
        id INTEGER,
        name TEXT NOT NULL,
        image TEXT,
        museumId INTEGER,
        PRIMARY KEY(id),
        FOREIGN KEY(museumId) REFERENCES museums(id)
    );`
)

createMuseumsTable.run()
createWorksTable.run()

const createMuseum = db.prepare(`INSERT INTO museums (name, city) VALUES (?,?);`)
const createWork = db.prepare(`INSERT INTO works (name, image, museumId) VALUES (?,?,?);`)

for(const museum of museums) {
    createMuseum.run(museum.name, museum.city)
}
for(const work of works) {
    createWork.run(work.name, work.image, work.museumId)
}