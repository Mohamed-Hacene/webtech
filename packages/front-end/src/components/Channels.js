
/** @jsxImportSource @emotion/react */

const styles = {
  root: {
  },
  channel: {
    color: '#fff',
    padding: '.2rem .5rem',
    whiteSpace: 'nowrap', 
  }
}

const Channels = ({
  channels
}) => {
  return (
    <ul style={styles.root}>
      { channels.map( (channel, i) => (
        <li key={i} css={styles.channel}>
          {channel.name}
        </li>
      ))}
    </ul>
  );
}

export default Channels
