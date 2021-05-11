import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  
  margin: {
    margin: '15px',
  }, 
  media: {
    height: 260,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cartActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}));