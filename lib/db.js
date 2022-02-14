const data = {
    channels: [{
      id: '1',
      name: 'Channel 1',
    },{
      id: '2',
      name: 'Channel 2',
    },{
      id: '3',
      name: 'Channel 3',
    }]
  }
  
  module.exports = {
    data: data,
    get: (id) => {
      const channel = data.channels.find( channel => channel.id === id )
      return channel ? channel : [id]
    },
    list: () => (
      data.channels.filter( (channel) => true )
    ),
  }
  