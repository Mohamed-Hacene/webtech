
/** @jsxImportSource @emotion/react */
import {useState} from 'react';
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

const db = [{
  author: 'root',
  creation: 1602831101929,
  content: `
  ## Welcome on this channel !
  `
}]

const Channel = ({
  channel
}) => {
  const [messages, setMessages] = useState(db)
  const addMessage = (message) => {
    setMessages([
      ...messages,
      message
    ])
  }
  return (
    <div css={styles.root}>
      <Messages channel={channel} messages={messages} />
      <MessagesForm addMessage={addMessage} />
    </div>
  );
}

export default Channel
