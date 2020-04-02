const express = require('express')
const path = require('path')
const volleyball = require('volleyball')

const app = express()

// logging middleware
// Only use logging middleware when not running tests
const debug = process.env.NODE_ENV === 'test'
app.use(volleyball.custom({ debug }))

// body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// static middleware
app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', require('./api')) // include our routes!

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
}) // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

//404 error handling
app.use((req, res, next) => {
  res.status(404).send('404 NOT FOUND :(');
})

// 500 error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('500 ERROR BOO :(');
})

module.exports = app
