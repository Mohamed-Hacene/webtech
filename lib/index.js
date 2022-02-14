const express = require('express')
const app = express()
const db = require('./db')

const config = {
    port: 3000
  }

  app.get('/', (req, res) => {
    // Project homepage
    // Return some HTML content inside `body` with:
    // * The page title
    // * A link to the `/channels` page
    // Don't bother with the `head` tag
    const html = [
        '<!DOCTYPE html>' +
        '<html>' +
        '    <head>' +
        '        <meta charset="utf-8" />' +
        '        <title>Homepage</title>' +
        '    </head>' + 
        '    <body>' +
        '       <p>Welcome !</p>' +
        '       <p>Click on this link to see all channels:' +
        '       <a href="/channels">here</a>' +
        '    </body>' +
        '</html>'
    ].join('')
    res.send(html)
  })
  
  app.get('/channels', (req, res) => {
    // List of channels
    // Return some HTML content inside `body` with:
    // * The page title
    // * A list of every channel with a link to the channel page
    // Notes:
    // * Channels are identified by channel ids.
    // * Make sure to find the appropriate HTML tag to respect the HTML semantic
    //   of a list
    res.json(db.list())
  })
  
  app.get('/channel/:id', (req, res) => {
    // Channel information
    // Print the channel title
    res.json(db.get(req.params.id))
  })
  
  app.listen(config.port, () => {
  console.log(`Chat is waiting for you at http://localhost:${config.port}`)
})
  