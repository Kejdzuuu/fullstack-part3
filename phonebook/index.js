require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const PhoneNumber = require('./models/phone_number')

morgan.token('data', function (req) {
  const body = JSON.stringify(req.body)
  return body === '{}' ? '' : body
})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :response-time :data'))


app.get('/info', (req, res) => {
  PhoneNumber.count({}, function(error, count) {
    if (error){
      res.send(error)
    }
    const info = () => {
      return (`
        <div>
          <p>Phonebook has info on ${count} people</p>
          <p>${new Date().toString()}</p>
        </div>
      `)
    }
    res.send(info())
  })
})

app.get('/api/persons', (req, res) => {
  PhoneNumber.find({}).then(entries => {
    res.json(entries)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  PhoneNumber.findById(req.params.id)
    .then(entry => {
      console.log(entry)
      if (entry) {
        res.json(entry)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  PhoneNumber.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
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

  PhoneNumber.findByIdAndUpdate(req.params.id, { name: phoneNumber.name, number: phoneNumber.number }, { runValidators: true, context: 'query' })
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
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

  phoneNumber.save()
    .then(newEntry => {
      console.log(`added ${phoneNumber.name}: ${phoneNumber.number} to phonebook`)
      res.json(newEntry)
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})