
/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useTheme } from '@mui/styles';
import './App.css';
// Local
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
import Login from './Login'

const useStyles = (theme) => ({
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#565E71',
    [theme.breakpoints.up('sm')]: {
      padding: '50px',
    },
  },
})

const App = () => {
  const styles = useStyles(useTheme())
  const [cookies,,] = useCookies([]);
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false)
  const [user, setUser] = useState(null)
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible)
  }
  useEffect( () => {
    if(cookies.oauth) {
      const id_payload = cookies.oauth.id_token.split('.')[1]
      const payload = JSON.parse(atob(id_payload))
      setUser({
        email: payload.email
      })
    } else {
      setUser(null)
    }
  }, [cookies.oauth])
  
  return (
    <div className="App" css={styles.root}>
      <Header drawerToggleListener={drawerToggleListener} user={user}/>
      { cookies.oauth ? <Main drawerMobileVisible={drawerMobileVisible} user={user}/> : <Login/> }
      <Footer />
    </div>
  );
}

export default App
