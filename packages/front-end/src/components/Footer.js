
/** @jsxImportSource @emotion/react */
import { useContext } from 'react';

import Context from '../Context'

const styles = {
  footer: {
    height: '50px',
    backgroundColor: 'rgba(65,105,225,.8)',
    flexShrink: 0,
  },
  footerLogIn: {

  },
}

const Footer = () => {
  const {drawerToggleListener, oauth, setOauth} = useContext(Context)
  return (
    <footer style={styles.footer}>
      <footerLogIn style={styles.footerLogIn}>
      { oauth ? 'Current Channel' : 'Please Login or create an account if you are a new user !' }
      </footerLogIn>   
    </footer>
  );
}

export default Footer
