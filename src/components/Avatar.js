import React from 'react';
import Avatar from 'material-ui/Avatar';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  big: {
    width: 100,
    height: 100,
  },
  normal: {
    width: 40,
    height: 40,
  },
});

const StyledAvatar = ({ text, imageURL, big, classes }) => {
  const className = big ? 'big' : 'normal';

  if (imageURL) {
    return <Avatar className={classes[className]} alt={text} src={imageURL} />;
  }
  return <Avatar className={classes[className]}>{text[0]}</Avatar>;
};

export default withStyles(styles)(StyledAvatar);
