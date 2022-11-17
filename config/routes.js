const express = require('express');
const routes = express.Routes()


let db = [
    { '1': { Nome: 'cliente 1', Espaço: '10 GB' } },
    { '2': { Nome: 'cliente 2', Espaço: '8 GB' } },
    { '3': { Nome: 'cliente 3', Espaço: '1 GB' } },
]

// Buscar Dados 
app.get('/', (req, res) => {
    return res.json(db)
})

// Inserir dados
app.post('/add', (req, res) => {
    const body = req.body

    if (!body)
        return res.status(400).end()

    db.push(body)
    return res.json(body)
})

routes.delete('/:id', (req, res) => {
    const id = req.params.id

    let newDB = db.filter(item => {
        if(!item[id])
            return item
    })
    
    return res.send(newDB)
})

module.exports = routes