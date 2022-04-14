
/** @jsxImportSource @emotion/react */
import { useContext } from 'react';
import { useTheme } from '@mui/styles';
import { IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// Local
import Context from '../Context'

const useStyles = (theme) => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: 'rgba(255,255,255,.3)',
    flexShrink: 0,
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
  menu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    },
  },
  button: {
    float: 'right'
  }
})

const Header = () => {
  const styles = useStyles(useTheme())
  const {drawerToggleListener, oauth, setOauth} = useContext(Context)
  const handleDrawerToggle = (e) => {
    drawerToggleListener()
  }
  
  return (
    <header css={styles.header}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        css={styles.menu}
      >
        <MenuIcon />
      </IconButton>
      Header - { oauth ? oauth.email : 'unauthorized' }
      { oauth ? <Button css={styles.button} onClick={() => setOauth(null)} variant="link">Logout</Button> : '' }
    </header>
  )
}

export default Header
