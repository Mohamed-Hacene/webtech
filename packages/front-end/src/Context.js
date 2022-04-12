import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const Context = React.createContext()

export default Context

export const ContextProvider = ({
  children
}) => {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [oauth, setOauth] = useState(cookies.oauth);
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false);
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible)
  };
  return (
    <Context.Provider value={{
      drawerMobileVisible: drawerMobileVisible,
      drawerToggleListener: drawerToggleListener,
      oauth: oauth,
      setOauth: (oauth) => {
        if(oauth) {
          const id_payload = oauth.id_token.split('.')[1]
          const payload = JSON.parse(atob(id_payload))
          oauth.email = payload.email
          setCookie('oauth', oauth)
        } else {
          removeCookie('oauth')
        }
        setOauth(oauth)
      }
    }}>{children}</Context.Provider>
  )
}
