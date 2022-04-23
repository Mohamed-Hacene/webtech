const {v4: uuid} = require('uuid')
const {clone, merge} = require('mixme')
const level = require('level')
const db = level(__dirname + '/../db')

module.exports = {
  // TODO: refactor to multiple modules (similar to routes)
  channels: {
    create: async (channel) => {
      if(!channel.name) throw Error('Invalid channel.')
      const id = uuid()
      await db.put(`channels:${id}`, JSON.stringify(channel))
      return merge(channel, {id: id})
    },
    list: async () => {
      return new Promise( (resolve, reject) => {
        const channels = []
        db.createReadStream({
          gt: "channels:",
          lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          channel = JSON.parse(value)
          channel.id = key.split(':')[1]
          channels.push(channel)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(channels)
        })
      })
    },
    get: async (id) => {
      if(!id) throw Error('Invalid channel id.')
      const channel = await db.get(`channels:${id}`)
      return merge(JSON.parse(channel), {id: id})
    },
    update: async (id, channel) => {
      if(!id) throw Error('Invalid channel id.')
      if(!channel) throw Error('Invalid channel.')
      const original = await db.get(`channels:${id}`)
      channel = merge(JSON.parse(original), channel)
      await db.put(`channels:${id}`, JSON.stringify(channel))
    },
    delete: async (id) => {
      if(!id) throw Error('Invalid channel id.')
      await db.del(`channels:${id}`)
      return {id: id}
    }
  },
  messages: {
    create: async (channelId, message) => {
      if(!channelId) throw Error('Invalid channel.')
      if(!message.author) throw Error('Invalid message author.')
      if(!message.content) throw Error('Invalid message content.')
      creation = Date.now()
      await db.put(`messages:${channelId}:${creation}`, JSON.stringify({
        author: message.author,
        content: message.content
      }))
      return merge(message, {channel: channelId, creation: creation})
    },
    list: async (channelId) => {
      return new Promise( (resolve, reject) => {
        const messages = []
        db.createReadStream({
          gt: `messages:${channelId}:`,
          lte: `messages:${channelId}` + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          message = JSON.parse(value)
          const [, channel, creation] = key.split(':')
          message.channel = channel
          message.creation = creation
          messages.push(message)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(messages)
        })
      })
    },
    delete: async (channelId, {creation}) => {
      try {
        if(!channelId) throw Error('Invalid channel')
        if(!creation) throw Error('Invalid message')
        await db.get(`messages:${channelId}:${creation}`)
        await db.del(`messages:${channelId}:${creation}`)
      } catch {
        throw Error('')
      }
    },
    update: async (channelId, {creation, content}) => {
      try {
        if(!channelId) throw Error('Invalid channel')
        if(!creation) throw Error('Invalid message')
        const message = JSON.parse(await db.get(`messages:${channelId}:${creation}`)) 
        message.content = content
        await db.put(`messages:${channelId}:${creation}`, JSON.stringify(message))
      } catch {
        throw Error('')
      }
    }
  },
  users: {
    create: async (user) => {
      if(!user.username) throw Error('Invalid user.')
      const id = uuid()
      await db.put(`users:${id}`, JSON.stringify(user))
      return merge(user, {id: id})
    },
    list: async () => {
      return new Promise( (resolve, reject) => {
        const users = []
        db.createReadStream({
          gt: "users:",
          lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          user = JSON.parse(value)
          user.id = key.split(':')[1]
          users.push(user)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(users)
        })
      })
    }
    // TODO: add methods: update, delete, get, ...
  },
  admin: {
    clear: async () => {
      await db.clear()
    }
  }
}
