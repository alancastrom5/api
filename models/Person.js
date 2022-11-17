const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
  name: String,
  esp_disponivel: Number,
  ultilizado: Number,
})

module.exports = Person