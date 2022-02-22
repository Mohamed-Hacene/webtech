const supertest = require('supertest')
const app = require('../lib/app')
const db = require('../lib/db')

describe('channels', () => {
  
  beforeEach( async () => {
    await db.admin.clear()
  })
  
  it('list empty', async () => {
    // Return an empty channel list by default
    const {body: channels} = await supertest(app)
    .get('/channels')
    .expect(200)
    channels.should.eql([])
  })
  
  it('list one element', async () => {
    // Create a channel
    await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    // Ensure we list the channels correctly
    const {body: channels} = await supertest(app)
    .get('/channels')
    .expect(200)
    channels.should.match([{
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      name: 'channel 1'
    }])
  })
  
  it('add one element', async () => {
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    // Check its return value
    channel.should.match({
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      name: 'channel 1'
    })
    // Check it was correctly inserted
    const {body: channels} = await supertest(app)
    .get('/channels')
    .expect(200)
    channels.length.should.eql(1)
  })
  
  it('get one element', async () => {
    // Create a channel
    const {body: original} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    // Get channel by id
    const {body: channel} = await supertest(app)
    .get(`/channels/${original.id}`)
    .expect(200)
    channel.should.match({
      id: original.id,
      name: 'channel 1'
    })
  })
  
  it('update one element', async () => {
    // Create a channel
    const {body: original} = await supertest(app)
    .post('/channels')
    .send({name: 'old name'})
    // Update a channel
    await supertest(app)
    .put(`/channels/${original.id}`)
    .send({name: 'new name'})
    .expect(200)
    // Check it was correctly updated
    const {body: channel} = await supertest(app)
    .get(`/channels/${original.id}`)
    .expect(200)
    channel.should.match({
      id: original.id,
      name: 'new name'
    })
  })
  
  it('delete one element', async () => {
    // Create a channel
    const {body: original} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    // Delete channel
    const {body: channel} = await supertest(app)
    .delete(`/channels/${original.id}`)
    .expect(200)
    channel.should.match({
      id: original.id,
    })
    // Get nothing
    await supertest(app)
    .get(`/channels/${original.id}`)
    .expect(400)
  })
  
})
