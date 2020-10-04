const mongoose = require('mongoose')

if (process.argv.length != 3 && process.argv.length != 5) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  console.log('To save a phonenumber: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const db_name = 'phonebook'
const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.d4ox1.mongodb.net/${db_name}?retryWrites=true&w=majority`

mongoose.connect (url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const phoneNumberSchema = new mongoose.Schema ({
  name: String,
  number: String,
})

const PhoneNumber = mongoose.model ('PhoneNumber', phoneNumberSchema)

if (process.argv.length === 3) {
  PhoneNumber.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(entry => {
      console.log(`${entry.name} ${entry.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  const phoneNumber = new PhoneNumber ({
    name: process.argv[3],
    number: process.argv[4]
  })

  phoneNumber.save().then(result =>{
    console.log(`added ${phoneNumber.name}: ${phoneNumber.number} to phonebook`)
    mongoose.connection.close()
  })
}
