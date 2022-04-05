
/** @jsxImportSource @emotion/react */

const styles = {
  root: {
    minWidth: '200px',
  },
  channel: {
    padding: '.2rem .5rem',
    whiteSpace: 'nowrap', 
  }
}

export default ({
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
