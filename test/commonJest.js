process.env.NODE_ENV = 'test'
const request = require('supertest')
const app = require('../app')

function id () {
  return (Math.ceil(Math.random() * 100000)).toString()
}

function removeID (text, id) {
  const idRegExp = new RegExp(id, 'g')
  // expect(text).toMatch(idRegExp)
  return text.replace(idRegExp, '<replaced_mongoose_id>')
}

// export MONGO_URL_USE_TEST='mongodb://localhost:27017/modulehandbook_test_db'
const mongodbURI = process.env.MONGO_URL_USE_TEST || process.env.MONGO_URL

const User = require('../models/user')
const Course = require('../models/course')

const mongoose = require('mongoose')
beforeAll(() => {
  process.env.NODE_ENV = 'test'
  mongoose.set('bufferCommands', false)
  mongoose.connect(mongodbURI,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log('connected to mongoose: ' + mongodbURI))
    .catch(error => console.log('error creating connection to: ' + mongodbURI + error))

  mongoose.connection.on('error', err => {
    console.log(err)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
  console.log('+++++ afterAll DB Close')
})

module.exports = {
  Course: Course,
  User: User,
  app: app,
  request: request,
  supertest: request,
  id: id,
  removeID: removeID,
  db: mongoose.connection
}
