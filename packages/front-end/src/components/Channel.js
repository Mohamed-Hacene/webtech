
/** @jsxImportSource @emotion/react */
import { useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
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

const Channel = ({
  channel
}) => {
  // Fetch messages from back-end
  const [messages, setMessages] = useState([])
  const {oauth} = useContext(Context);
  useEffect( () => {
    const fetch = async () => {
      try {
        const {data: messages} = await axios.get(`http://localhost:3001/channels/${channel.id}/messages`, {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setMessages(messages)
      } catch(err) {
        console.error(err)
      }
    }
    fetch()
  }, [channel, setMessages, oauth.access_token])
  const addMessage = (message) => {
    setMessages([
      ...messages,
      message
    ])
  }
  return (
    <div css={styles.root}>
      <Messages channel={channel} messages={messages} />
      <MessagesForm addMessage={addMessage} channelId={channel.id} />
    </div>
  );
}

export default Channel
