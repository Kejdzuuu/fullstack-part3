const express = require('express')
const app = express()

app.use(express.json())

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


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})