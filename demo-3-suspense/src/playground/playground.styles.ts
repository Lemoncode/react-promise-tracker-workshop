import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
});

interface ImageStylesProps {
  width?: string;
  height?: string;
}

export const useImageStyles = makeStyles<{}, ImageStylesProps>({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  image: {
    width: ({ width }) => (Boolean(width) ? `${width}px` : 'auto'),
    height: ({ height }) => (Boolean(height) ? `${height}px` : 'auto'),
    marginBottom: '2rem',
    borderRadius: '8px',
  },
});
