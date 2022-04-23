
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// Markdown
import {unified} from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
// Time
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import updateLocale from 'dayjs/plugin/updateLocale'
import { Button } from '@mui/material'

dayjs.extend(calendar)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  calendar: {
    sameElse: 'DD/MM/YYYY hh:mm A'
  }
})

const styles = {
  root: {
    flex: '1 1 auto',
    overflow: 'auto',
    '& ul': {
      'margin': 0,
      'padding': 0,
      'textIndent': 0,
      'listStyleType': 0,
    },
  },
  message: {
    padding: '.2rem .5rem',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,.2)',
    },
  },
}

const Messages = ({
  channel,
  messages, 
  delMessage,
  updateMessage
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [vaalue, setValue] = useState("");
  return (
    <div css={styles.root}>
      <h1>Messages for {channel.name}</h1>
      <ul>
        { messages.map( (message, i) => {
          const {value} = unified()
          .use(markdown)
          .use(remark2rehype)
          .use(html)
          .processSync(message.content);
          
          return (
            <li key={i} css={styles.message}>
              <p>
                <span>{message.author}</span>
                {' - '}
                <span>{dayjs().calendar(message.creation)}</span>
                {' - '}
                <Button onClick= { async () => {await delMessage(i, message.creation)}}>Delete</Button>
                {' - '}
                <Button onClick={handleClickOpen} >Update</Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Update your message</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Change your message ✍
                      and close this popup.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      id = 'msg'
                      margin="dense"
                      type="text"
                      value={vaalue}
                      fullWidth
                      variant="standard"
                      onChange={(e) => {
                        setValue(e.target.vaalue);
                      }}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={ async () => {await updateMessage(i, message.creation, document.getElementById('msg').value); handleClose()}}>Send</Button>
                  </DialogActions>
                </Dialog>
              </p>
              <div dangerouslySetInnerHTML={{__html: value}}>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Messages
// { async () => {await updateMessage(i, message.creation, 'test')}}