
/** @jsxImportSource @emotion/react */
import { useCookies } from 'react-cookie';
import { useTheme } from '@mui/styles';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

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
  }
})

const Header = ({
  drawerToggleListener
}) => {
  const styles = useStyles(useTheme())
  const handleDrawerToggle = (e) => {
    drawerToggleListener()
  }
  const [cookies,,] = useCookies([])
  let payload
  if(cookies.oauth) {
    const id_payload = cookies.oauth.id_token.split('.')[1]
    payload = JSON.parse(atob(id_payload))
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
      Header - { payload ? payload.email : 'unauthorized' }
    </header>
  )
}

export default Header
