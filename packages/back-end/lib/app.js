const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// Import routes
const { 
  channels,
  users,
} = require('./routes')

// Middleware
app.use(bodyParser.json())

// Routes
app.get('/', (req, res) => {
  const html = [
    '<!doctype html>',
    '<html lang="en">',
      '<body>',
        '<h1>Webtech Chat</h1>',
        '<p>Go to <a href="/channels">channels</a>.</p>',
      '</body>',
    '</html>',
  ].join('')
  res.send(html)
})
app.use('/channels', channels)
app.use('/users', users)

module.exports = app
