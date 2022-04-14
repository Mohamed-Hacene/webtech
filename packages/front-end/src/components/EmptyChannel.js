
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

const EmptyChannel = () => {
  const styles = useStyles(useTheme())
  return (
    <div css={styles.root}>
      Go to a channel or create one.
    </div>
  );
}

export default EmptyChannel
