const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('data', function (req, res) {
  const body = JSON.stringify(req.body)
  return body === '{}' ? '' : body
})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :response-time :data'))

let persons = [
  {
    name: "Kimi Raikkonen",
    number: "0123-567",
    id: 1
  },
  {
    name: "Valtteri Bottas",
    number: "2",
    id: 2
  },
  {
    name: "Dennis Ritchie",
    number: "441242-22",
    id: 3
  }
]

app.get('/info', (req, res) => {
  const info = () => {
    return (`
      <div>
        <p>Phonebook has info on ${persons.length} people</p>
        <p>${new Date().toString()}</p>
      </div>
    `)
  }
  res.send(info())
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  if(!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
  if(persons.find(person => person.name === req.body.name)){
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const id = Math.floor(Math.random() * 0x10000000)
  const person = {
    name: req.body.name,
    number: req.body.number,
    id: id
  }

  persons = persons.concat(person)
  res.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})