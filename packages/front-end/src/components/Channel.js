
/** @jsxImportSource @emotion/react */
import { useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
// Local
import MessagesForm from './MessagesForm'
import Messages from './Messages'
import Context from '../Context'

const styles = {
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    // overflow: 'hidden',
    background: 'rgba(0,0,0,.2)'
  },
}

const Channel = () => {
  // Fetch messages from back-end
  const [channel, setChannel] = useState([])
  const [messages, setMessages] = useState([])
  const {oauth} = useContext(Context);
  const { id } = useParams()
  const navigate = useNavigate();
  useEffect( () => {
    const fetch = async () => {
      try {
        const {data: messages} = await axios.get(`http://localhost:3001/channels/${id}/messages`, {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setMessages(messages)
        const {data: channel} = await axios.get(`http://localhost:3001/channels/${id}`, {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setChannel(channel)
      } catch(err) {
        navigate('/oups')
      } 
    }
    fetch()
  }, [id, setMessages, setChannel, oauth.access_token])
  const addMessage = (message) => {
    setMessages([
      ...messages,
      message
    ])
  }
  const delMessage = async (idMessage, creation) => {
    await axios.delete(`http://localhost:3001/channels/${id}/messages`, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      },
      data: {
        creation : creation
      }
    })
    messages.splice(idMessage, 1)
    setMessages([
      ...messages
    ])
  }
  const updateMessage = async (idMessage, creation, content) => {
    await axios.put(`http://localhost:3001/channels/${id}/messages`, {
    creation : creation,
    content : content
  },
  {
    headers: {
      'Authorization': `Bearer ${oauth.access_token}`
    }
  })
  messages[idMessage].content = content
    setMessages([
      ...messages
    ])
  }
  return (
    <div css={styles.root}>
      <Messages messages={messages} channel={channel} delMessage={delMessage} updateMessage={updateMessage}/>
      <MessagesForm addMessage={addMessage} channelId={id} />
    </div>
  );
}

export default Channel
