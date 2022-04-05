
/** @jsxImportSource @emotion/react */
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const styles = {
  root: {
    flex: '1 1 auto',
    backgroundColor: '#373B44',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& > div': {
      margin: '1rem',
      marginLeft: 'auto',
      marginRight: 'auto',
      '& > div': {
        display: 'block',
      }
    }
  }
}

const Login = ({
  setUser
}) => (
  <div css={styles.root}>
    <div>
      <TextField id="username" label="Username" variant="filled" margin="normal"/>
      <TextField id="username" label="Password" variant="filled" margin="normal" />
      <Button variant="contained" fullWidth margin="normal" onClick={ (e) => {
        e.stopPropagation()
        setUser({username: 'john'})
      }}>Login</Button>
    </div>
  </div>
)

export default Login
