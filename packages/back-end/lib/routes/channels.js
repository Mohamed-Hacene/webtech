const express = require('express')
const db = require('../db')
const { createResponseError } = require('../utils')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const channels = await db.channels.list()
    res.json(channels)
  } catch (err) {
    res.status(400).json(createResponseError(err.message))
  }
})

router.post('/', async (req, res) => {
  try {
    const channel = await db.channels.create(req.body.channel)
    res.status(201).json(channel)
  } catch (err) {
    res.status(400).json(createResponseError(err.message))
  }
})

router.get('/:id', async (req, res) => {
  try {
    const channel = await db.channels.get(req.params.id)
    res.json(channel)
  } catch (err) {
    res.status(400).json(createResponseError(err.message))
  }
})

router.put('/:id', async (req, res) => {
  try {
    const channel = await db.channels.update(req.params.id, req.body)
    res.json(channel)
  } catch (err) {
    res.status(400).json(createResponseError(err.message))
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const channel = await db.channels.delete(req.params.id)
    res.json(channel)
  } catch (err) {
    res.status(400).json(createResponseError(err.message))
  }
})

// Messages

router.get('/:id/messages', async (req, res) => {
  try {
    await db.channels.get(req.params.id) // throws error if channel doesn't exists
    const messages = await db.messages.list(req.params.id)
    res.json(messages)
  } catch(err) {
    return res.status(400).json(err.message)
  }
})

router.post('/:id/messages', async (req, res) => {
  try {
    if(!req.body.author && req.user.email)
      req.body.author = req.user.email
    const message = await db.messages.create(req.params.id, req.body)
    res.status(201).json(message)
  } catch (err) {
    res.status(400).json(createResponseError(err.message))
  }
})

router.delete('/:id/messages', async (req, res) => {
  try {
    const messages = await db.messages.delete(req.params.id, req.body)
    res.json(messages)
  } catch(err) {
    return res.status(400).json(err.message)
  }
})

router.put('/:id/messages', async (req, res) => {
  try {
    const messages = await db.messages.update(req.params.id, req.body)
    res.json(messages)
  } catch(err) {
    return res.status(400).json(err.message)
  }
})

module.exports = router
