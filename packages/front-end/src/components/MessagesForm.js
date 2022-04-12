
/** @jsxImportSource @emotion/react */
import axios from 'axios';
import { useCookies } from 'react-cookie';

const styles = {
  form: {
    borderTop: '2px solid #373B44',
    padding: '.5rem',
    display: 'flex',
  },
  content: {
    flex: '1 1 auto',
    marginRight: '.5rem'
  },
  send: {
    backgroundColor: '#D6DDEC',
    padding: '.2rem .5rem',
    border: 'none',
    ':hover': {
      backgroundColor: '#2A4B99',
      cursor: 'pointer',
      color: '#fff',
    },
  },
}

const MessagesForm = ({
  addMessage,
  channelId,
  user
}) => {
  const [cookies] = useCookies([]);
  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    // Send to back-end
    const {data: message} = await axios.post(
      `http://localhost:3001/channels/${channelId}/messages`
    , {
      content: data.get('content'),
    }, {
      headers: {
        'Authorization': `Bearer ${cookies.oauth.access_token}`
      }
    })
    addMessage(message) // Update react state
    e.target.elements.content.value = '' // Refresh the input form
  } 
  return (
    <form css={styles.form}  onSubmit={onSubmit}>
      <input type="input" name="content" css={styles.content} />
      <input type="submit" value="Send" css={styles.send} />
    </form>
  )
}

export default MessagesForm
