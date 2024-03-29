
const supertest = require('supertest')
const app = require('../lib/app')
const db = require('../lib/db')

describe('messages', () => {
  
  beforeEach( async () => {
    await db.admin.clear()
  })
  
  it('list empty', async () => {
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    // Get messages
    const {body: messages} = await supertest(app)
    .get(`/channels/${channel.id}/messages`)
    .expect(200)
    messages.should.eql([])
  })
  
  it('list one element', async () => {
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    // Create a message inside it
    await supertest(app)
    .post(`/channels/${channel.id}/messages`)
    .send({
      author: 'user_1',
      content: 'Hello ECE'
    })
    // Get messages
    const {body: messages} = await supertest(app)
    .get(`/channels/${channel.id}/messages`)
    .expect(200)
    messages.should.match([{
      creation: (it) => it.should.be.approximately(Date.now(), 1000),
      content: 'Hello ECE',
      channel: channel.id,
    }])
  })
  
  it('add one element', async () => {
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    // Create a message inside it
    const {body: message} = await supertest(app)
    .post(`/channels/${channel.id}/messages`)
    .send({
      author: 'user_1',
      content: 'Hello ECE'
    })
    .expect(201)
    message.should.match({
      creation: (it) => it.should.be.approximately(Date.now(), 1000),
      content: 'Hello ECE'
    })
    // Check it was correctly inserted
    const {body: messages} = await supertest(app)
    .get(`/channels/${channel.id}/messages`)
    .expect(200)
    messages.length.should.eql(1)
  })
  
  // TODO: test other routes: get, update, delete, ...
    
})
