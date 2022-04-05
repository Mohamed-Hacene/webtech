
/** @jsxImportSource @emotion/react */
// Local
import Channels from './Channels'
import Channel from './Channel'

const styles = {
  main: {
    backgroundColor: '#373B44',
    overflow: 'hidden',
    // flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
    // '&>*': {
    // 
    // }
  },
}

const channel = {
  name: 'Fake channel'
}

export default () => {
  return (
    <main css={styles.main}>
      <Channels channels={[channel]}/>
      <Channel channel={channel}/>
    </main>
  );
}
