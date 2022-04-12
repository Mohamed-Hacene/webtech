
/** @jsxImportSource @emotion/react */
import { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/styles';
import { Drawer, useMediaQuery } from '@mui/material';
import axios from 'axios';
// Local
import Channels from './Channels'
import Channel from './Channel'
import Context from '../Context'

const styles = {
  main: {
    backgroundColor: '#373B44',
    overflow: 'hidden',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  drawer: {
    width: '250px',
    display: 'none',
  },
  drawerVisible: {
    display: 'block',
  },
}

const Main = () => {
  const theme = useTheme()
  const {drawerMobileVisible, oauth} = useContext(Context)
  const alwaysOpen = useMediaQuery(theme.breakpoints.up('sm'))
  const isDrawerVisible = alwaysOpen || drawerMobileVisible
  // Fetch channels from back-end
  const [channels, setChannels] = useState([])
  const [currentChannel, setCurrentChannel] = useState(null)
  useEffect( () => {
    const fetch = async () => {
      try {
        const {data: channels} = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setChannels(channels)
        if (channels.length > 0)
          setCurrentChannel(channels[0])
      } catch(err) {
        console.error(err)
      }
    }
    fetch()
  }, [setChannels, oauth.access_token])
  return (
    <main css={styles.main}>
      <Drawer
        PaperProps={{ style: { position: 'relative', backgroundColor: '#373B44' } }}
        BackdropProps={{ style: { position: 'relative' } }}
        ModalProps={{
          style: { position: 'relative', backgroundColor: '#373B44', }
        }}
        variant="persistent"
        open={isDrawerVisible}
        css={[styles.drawer, isDrawerVisible && styles.drawerVisible]}
      >
        <Channels channels={channels} setCurrentChannel={setCurrentChannel} />
      </Drawer>
      {currentChannel ? <Channel channel={currentChannel}/> : '' }
    </main>
  );
}

export default Main
