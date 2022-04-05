
/** @jsxImportSource @emotion/react */
// Markdown
import {unified} from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
// Time
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import updateLocale from 'dayjs/plugin/updateLocale'
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

export default ({
  channel,
  messages
}) => {
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
