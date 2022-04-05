
/** @jsxImportSource @emotion/react */
import './App.css';
// Local
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'

const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#565E71',
    padding: '50px',
  },
}

export default () => {
  return (
    <div className="App" css={styles.root}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
