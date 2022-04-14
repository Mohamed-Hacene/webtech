
/** @jsxImportSource @emotion/react */
import { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/styles';
import { Drawer, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
// Local
import Channels from './Channels'
import Channel from './Channel'
import EmptyChannel from './EmptyChannel'
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
        <Channels/>
      </Drawer>
      <Routes>
        <Route path=":id" element={<Channel />}/>
        <Route path="/" element={<EmptyChannel />}/>
      </Routes>
    </main>
  );
}

export default Main
