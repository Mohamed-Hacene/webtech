
/** @jsxImportSource @emotion/react */
import { useTheme } from '@mui/styles';
import { Drawer, useMediaQuery } from '@mui/material';
// Local
import Channels from './Channels'
import Channel from './Channel'

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

const channel = {
  name: 'Fake channel'
}

const Main = ({
  drawerMobileVisible
}) => {
  const theme = useTheme()
  const alwaysOpen = useMediaQuery(theme.breakpoints.up('sm'))
  const isDrawerVisible = alwaysOpen || drawerMobileVisible
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
        <Channels channels={[channel]} />
      </Drawer>
      <Channel channel={channel} />
    </main>
  );
}

export default Main
