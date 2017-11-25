export default theme => ({
  container: {
    margin: '20px auto',
    display: 'flex',
    alignItems: 'center',
    justifycontent: 'center',
    flexDirection: 'column',
    width: 'calc(100% - 40px)',
    maxWidth: 700,
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    width: '100%',
  },
  root: {
    width: '100%',
    maxWidth: 580,
    margin: '20px auto',
    background: theme.palette.background.paper,
  },
});
