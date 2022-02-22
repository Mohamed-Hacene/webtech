const express = require('express')
const db = require('../db')
const { createResponseError } = require('../utils')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await db.users.list()
    res.json(users)
  } catch (err) {
    res.status(400).json(createResponseError(err.message))
  }
})

router.post('/', async (req, res) => {
  try {
    const user = await db.users.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json(createResponseError(err.message))
  }
})

module.exports = router
