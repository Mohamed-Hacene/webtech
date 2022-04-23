/** @jsxImportSource @emotion/react */
import {useContext, useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import qs from 'qs'
import axios from 'axios'
// Layout
import {useTheme} from '@mui/styles';
import {Button} from '@mui/material';
import getPkce from 'oauth-pkce';
// Local
import Context from './Context'

const URL =
'https://wallpaperaccess.com/full/1287373.jpg'

const useStyles = (theme) => ({
  
  root: {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundImage: `url(${URL})`,
    backgroundRepeat:'no-repeat',
    '& > button': {
      width: 'fit-content',
      margin: 'auto'
    }
  }
})

const Redirect = ({config, codeChallenge}) => {
  const styles = useStyles(useTheme())
  const redirectLogin = (e) => {
    e.stopPropagation()
    const url = [
      `${config.authorization_endpoint}?`,
      `client_id=${config.client_id}&`,
      `scope=${config.scope}&`,
      `response_type=code&`,
      `redirect_uri=${config.redirect_uri}&`,
      `code_challenge=${codeChallenge}&`,
      `code_challenge_method=S256`
    ].join('')
    window.location = url
  }
  const redirectSignIn = (e) => {
    e.stopPropagation()

  }
  return (
    <div css={styles.root}>
      <Button style={{
        borderRadius: 35,
        backgroundColor: 'rgba(65,105,225,.6)',
        padding: "18px 36px",
        fontSize: "18px"
        
    }}
    onClick={redirectLogin} variant="contained">Login</Button>
    <Button style={{
        borderRadius: 35,
        backgroundColor: 'rgba(65,105,225,.6)',
        padding: "18px 36px",
        fontSize: "18px"
        
    }}
    onClick={redirectSignIn} variant="contained">Sign-in</Button>
    </div>
  )
}

const Tokens = () => {
  const styles = useStyles(useTheme())
  const {oauth, setOauth} = useContext(Context) // Access to context
  const logout = (e) => {
    e.stopPropagation()
    // Remove oauth state on logout
    setOauth(null)
  }
  return (
    <div css={styles.root}>
      Welcome {oauth.email}!
      <div>
        <Button onClick={logout} variant="contained">Logout</Button>
      </div>
    </div>
  )
}

const LoadToken = function({code, codeVerifier, config}) {
  const styles = useStyles(useTheme())
  const [,, removeCookie] = useCookies([]);
  const {setOauth} = useContext(Context) // Access to context
  useEffect(() => {
    const fetch = async () => {
      try {
        const {data: oauth} = await axios.post(config.token_endpoint, qs.stringify({
          grant_type: 'authorization_code',
          client_id: `${config.client_id}`,
          code_verifier: `${codeVerifier}`,
          redirect_uri: `${config.redirect_uri}`,
          code: `${code}`
        }))
        removeCookie('code_verifier')
        setOauth(oauth)
        window.location = '/'
      } catch (err) {
        console.error(err)
      }
    }
    fetch()
  })
  return (
    <div css={styles.root}>Loading tokens</div>
  )
}

const Login = ({onUser}) => {
  const styles = useStyles(useTheme())
  const [cookies, setCookie,] = useCookies([]);
  const {oauth} = useContext(Context); // Access to context
  const [pkce, setPkce] = useState({})
  useEffect(() => {
    const pkceWrapper = async () => {
      const {verifier, challenge} = await new Promise((resolve) => {
        getPkce(43, (error, {verifier, challenge}) => {
          if (error) 
            throw error;
          resolve({verifier, challenge});
        });
      });
      setPkce({verifier, challenge})
    }
    pkceWrapper()
  }, [])
  const config = {
    authorization_endpoint: 'http://localhost:5556/dex/auth',
    token_endpoint: 'http://localhost:5556/dex/token',
    client_id: 'webtech-frontend',
    scope: 'openid%20email%20offline_access',
    redirect_uri: 'http://localhost:3000',
  }
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  // Is there a code query parameters in the url
  if (!code) { // No: we are no being redirected from an oauth server
    if (!oauth && pkce) {
      setCookie('code_verifier', pkce.verifier)
      return (
        <Redirect codeChallenge={pkce.challenge} config={config} css={styles.root}/>
      )
    } else { // Yes: user is already logged in, great, is is working
      return (
        <Tokens css={styles.root}/>
      )
    }
  } else { // Yes, we are coming from an oauth server
    return (
      <LoadToken
        code={code}
        codeVerifier={cookies.code_verifier}
        config={config}
        />
    )
  }
}

export default Login
