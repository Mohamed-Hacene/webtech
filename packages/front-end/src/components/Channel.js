
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
  author: 'mohamed-hacène',
  creation: 1602831101929,
  content: `
  ## 1 - Architecture - Level easy
  
  It is now the right time to re-organize/refactor our code. Split this
  monolithic react Component into multiple section. In the end, we should end
  up with the following components: 'Header', 'Footer', 'Main', 'Channels',
  'Channel', 'Messages', 'MessageSend':
  
  - 'App.js' file uses 'Header.js', 'Main.js', 'Footer.js'
  - 'Main.js' file uses 'Channels.js', 'Channel.js'
  - 'Channels.js' prints the list of channels
  - 'Channel.js' prints the messages, uses 'Messages.js' and 'MessageSend.js'
  - 'Messages.js' prints the list of messages inside the current channel
  - 'MessageForm.js' send a new message
  
  \`\`\`
  +--------------------------------------------+
  |                  Header                    |
  +--------------------------------------------+
  |   Channels    |          Channel           |
  |               | +------------------------+ |
  |               | |        Messages        | |
  |               | +------------------------+ |
  |               | |      MessageSend       | |
  |               | +------------------------+ |
  +--------------------------------------------+
  |                  Footer                    |
  +--------------------------------------------+
  \`\`\`
  `,
},{
  author: 'ambroise',
  creation: 1602832138892,
  content: `
  ## 2 - Styles - Level easy
  
  First Message
  `,
},{
  author: 'mohamed-hacène',
  creation: 1602840139202,
  content: `
  ## 3 - Use an external library - Level medium
  
  Date
  `,
},{
  author: 'ambroise',
  creation: 1602844139200,
  content: `
  ## 4 - Support message contents in Markdown - Level hard
  
  Markdown
  `,
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
