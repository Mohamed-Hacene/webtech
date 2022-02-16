//Imort modules
const express = require('express')
const db = require('../db')
const router = express.Router()

router.get('/', async (req, res) => {
  const channels = await db.channels.list()
  res.json(channels)
})

router.post('/', async (req, res) => {
  const channel = await db.channels.create(req.body)
  res.status(201).json(channel)
})

router.get('/:id', (req, res) => {
  const channel = db.channels.get(req.params.id)
  res.json(channel)
})

router.put('/:id', (req, res) => {
  const channel = db.channels.update(req.params.id, req.body)
  res.json(channel)
})

router.delete('/:id', (req, res) => {
  const channel = db.channels.delete(req.params.id)
  res.json(channel)
})

module.exports = router