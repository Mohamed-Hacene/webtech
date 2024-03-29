
/** @jsxImportSource @emotion/react */
// Layout
import { useTheme } from '@mui/styles';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


const useStyles = (theme) => ({
  root: {
    overflow: 'hidden',
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default function Oups() {
  const styles = useStyles(useTheme())
  return (
    <main css={styles.root}>
      <div>
        An unexpected error occured, it is probably not your fault. Sorry.
        <div>
          <Link to="/" component={RouterLink}>Go to home</Link>
        </div>
      </div>
    </main>
  );
}
