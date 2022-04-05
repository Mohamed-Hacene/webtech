
/** @jsxImportSource @emotion/react */
import { useState } from 'react'
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
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible)
  }
  return (
    <div className="App" css={styles.root}>
      <Header drawerToggleListener={drawerToggleListener}/>
      { cookies.oauth ? <Main drawerMobileVisible={drawerMobileVisible}/> : <Login/> }
      <Footer />
    </div>
  );
}

export default App
