const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const authenticator = require('./authenticator')
const app = express()

// Import routes
const { 
  channels,
  users,
} = require('./routes')
// Initialize authenticator
const authenticate = authenticator({
  test_payload_email: process.env['TEST_PAYLOAD_EMAIL'], // Used for a backdor for testing and developing
  jwks_uri: 'http://localhost:5556/dex/keys'
})

// Middleware
app.use(bodyParser.json())
app.use(cors())

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
app.use('/channels', authenticate, channels)
app.use('/users', authenticate, users)

module.exports = app
