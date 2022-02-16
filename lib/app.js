// Import routes
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const { 
  channels,
} = require('./routes')


// Middleware
app.use(bodyParser.json())

app.get('/', (req, res) => {
  const html = [
    '<!doctype html>',
    '<html lang="en">',
      '<body>',
        '<h1>Webtech Chat</h1>',
        '<p>Click on this link to see all channels: <a href="/channels">here</a>.</p>',
      '</body>',
    '</html>',
  ].join('')
  res.send(html)
})

app.use('/channels', channels)

module.exports = app