/** @jsxImportSource @emotion/react */
import {useEffect, useState} from 'react';
import {useCookies} from 'react-cookie';
import qs from 'qs'
import axios from 'axios'
// Layout
import {useTheme} from '@mui/styles';
import {Button} from '@mui/material';
import getPkce from 'oauth-pkce';

const useStyles = (theme) => ({
  root: {
    flex: '1 1 auto',
    background: '#373B44',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& > button': {
      width: 'fit-content',
      margin: 'auto'
    }
  }
})

const Redirect = ({config, codeChallenge}) => {
  const styles = useStyles(useTheme())
  const redirect = (e) => {
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
  return (
    <div css={styles.root}>
      <Button onClick={redirect} variant="contained">Login with OIDC</Button>
    </div>
  )
}

const Tokens = ({oauth}) => {
  const [,, removeCookie] = useCookies([]);
  const styles = useStyles(useTheme())
  const {id_token} = oauth
  const id_payload = id_token.split('.')[1]
  const {email} = JSON.parse(atob(id_payload))
  const logout = (e) => {
    e.stopPropagation()
    removeCookie('oauth')
  }
  return (
    <div css={styles.root}>
      Welcome {email}!
      <div>
        <Button onClick={logout} variant="contained">Logout</Button>
      </div>
    </div>
  )
}

const LoadToken = function({code, codeVerifier, config, removeCookie, setCookie}) {
  const styles = useStyles(useTheme())
  useEffect(() => {
    const fetch = async () => {
      try {
        const {data: oauth} = await axios.post(config.token_endpoint, qs.stringify({grant_type: 'authorization_code', client_id: `${config.client_id}`, code_verifier: `${codeVerifier}`, redirect_uri: `${config.redirect_uri}`, code: `${code}`}))
        removeCookie('code_verifier')
        setCookie('oauth', oauth)
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
  const [cookies, setCookie, removeCookie] = useCookies([]);
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
    authorization_endpoint: 'http://127.0.0.1:5556/dex/auth',
    token_endpoint: 'http://127.0.0.1:5556/dex/token',
    client_id: 'webtech-frontend',
    redirect_uri: 'http://127.0.0.1:3000',
    scope: 'openid%20email%20offline_access'
  }
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  // Is there a code query parameters in the url
  if (!code) { // No: we are no being redirected from an oauth server
    if (!cookies.oauth && pkce) {
      setCookie('code_verifier', pkce.verifier)
      return (
        <Redirect codeChallenge={pkce.challenge} config={config} css={styles.root}/>
      )
    } else { // Yes: user is already logged in, great, is is working
      return (
        <Tokens oauth={cookies.oauth} css={styles.root}/>
      )
    }
  } else { // Yes, we are coming from an oauth server
    return (
      <LoadToken code={code} codeVerifier={cookies.code_verifier} config={config} setCookie={setCookie} removeCookie={removeCookie}/>
    )
  }
}

export default Login
