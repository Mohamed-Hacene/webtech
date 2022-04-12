
/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
// Local
import MessagesForm from './MessagesForm'
import Messages from './Messages'

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

const Channel = ({
  channel,
  user
}) => {
  // Fetch messages from back-end
  const [messages, setMessages] = useState([])
  const [cookies] = useCookies([]);
  useEffect( () => {
    const fetch = async () => {
      try {
        const {data: messages} = await axios.get(`http://localhost:3001/channels/${channel.id}/messages`, {
          headers: {
            'Authorization': `Bearer ${cookies.oauth.access_token}`
          }
        })
        setMessages(messages)
      } catch(err) {
        console.error(err)
      }
    }
    fetch()
  }, [channel, setMessages, cookies.oauth.access_token])
  const addMessage = (message) => {
    setMessages([
      ...messages,
      message
    ])
  }
  return (
    <div css={styles.root}>
      <Messages channel={channel} messages={messages} />
      <MessagesForm addMessage={addMessage} channelId={channel.id} user={user} />
    </div>
  );
}

export default Channel
