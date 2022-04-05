
/** @jsxImportSource @emotion/react */
import { useState } from 'react'
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
  const [user, setUser] = useState(null)
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false)
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible)
  }
  return (
    <div className="App" css={styles.root}>
      <Header drawerToggleListener={drawerToggleListener}/>
      { user ? <Main drawerMobileVisible={drawerMobileVisible}/> : <Login setUser={setUser} /> }
      <Footer />
    </div>
  );
}

export default App
