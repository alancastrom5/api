const router = require('express').Router()

const Person = require('../models/Person')

//create - criacao de dados
router.post('/', async (req, res) => {
    const { name, esp_disponivel, ultilizado } = req.body
  
    if(!name) {
      res.status(422).json({ error: ' nome obrigatio' })
    }
  
    const person = {
      name,
      esp_disponivel,
      ultilizado,
    }
  
    try {
      await Person.create(person)
  
      res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

  // leitura de dados
  router.get('/',async (req, res) => {
    try{

        const people = await Person.find()

        res.status(200).json(people)
    } catch (error) {
        res.statusCode(500).json({error: error})
    }
  })
  router.get('/person/:id', async (req, res) => {
    const id = req.params.id
  
    try {
      const person = await Person.findOne({ _id: id })
  
      if (!person) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
      }
  
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  router.patch('/person/:id', async (req, res) => {
    const id = req.params.id
  
    const { name, esp_disponivel, ultilizado } = req.body
  
    const person = {
      name,
      esp_disponivel,
      ultilizado,
    }
  
    try {
      const updatedPerson = await Person.updateOne({ _id: id }, person)
  
      if (updatedPerson.matchedCount === 0) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
      }
  
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  router.delete('/person/:id', async (req, res) => {
    const id = req.params.id
  
    const person = await Person.findOne({ _id: id })
  
    if (!person) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
  
    try {
      await Person.deleteOne({ _id: id })
  
      res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  

 module.exports = router