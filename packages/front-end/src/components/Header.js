
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
    backgroundColor: 'rgba(65,105,225,.8)',
    flexShrink: 0,
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
    float: 'right',
    backgroundColor: 'black'
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
      { oauth ? oauth.email : 'Hello to our web chatting application' }
      { oauth ? <Button css={styles.button} onClick={() => setOauth(null)} variant="link">Logout</Button> : '' }
    </header>
  )
}

export default Header
