
/** @jsxImportSource @emotion/react */
import { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useTheme } from '@mui/styles';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// Local
import './App.css';
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
import Login from './Login'
import Context from './Context'
import Oups from './Oups'

const URL =
'https://cdn.wallpapersafari.com/12/93/Ei0zCM.jpg'

const useStyles = (theme) => ({
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: `url(${URL})`,
    backgroundRepeat:'no-repeat',
    [theme.breakpoints.up('sm')]: {
      padding: '50px',
    },
  },
})

const App = () => {
  const styles = useStyles(useTheme())
  const {oauth} = useContext(Context)
  const location = useLocation()
  const gochannels = (<Navigate
    to={{
      pathname: "/channels",
      state: { from: location }
    }}
  />)
  const gohome = (<Navigate
    to={{
      pathname: "/",
      state: { from: location }
    }}
  />)
  return (
    <div className="App" css={styles.root}>
      <Header/>
      <Routes>
        <Route exact path="/" element={oauth ? gochannels : <Login />}/>
        <Route path="/channels/*" element={oauth ? <Main /> : gohome}/>
        <Route path="/oups" element={<Oups />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App
