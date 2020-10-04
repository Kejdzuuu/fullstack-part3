require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const PhoneNumber = require('./models/phone_number')

morgan.token('data', function (req, res) {
  const body = JSON.stringify(req.body)
  return body === '{}' ? '' : body
})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :response-time :data'))

persons = []


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
  PhoneNumber.find({}).then(entries => {
    res.json(entries)
  })
})

app.get('/api/persons/:id', (req, res) => {
  PhoneNumber.findById(req.params.id).then(entry => {
    res.json(entry)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if(!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const phoneNumber = new PhoneNumber ({
    name: body.name,
    number: body.number
  })

  phoneNumber.save().then(newEntry =>{
    console.log(`added ${phoneNumber.name}: ${phoneNumber.number} to phonebook`)
    res.json(newEntry)
  })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})