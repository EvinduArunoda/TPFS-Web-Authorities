/**
 *
 * ViewRegionalRules
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { PapperBlock } from 'dan-components';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { bindActionCreators, compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from 'dan-components/Loading';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import reducer from './reducer';
import saga from './saga';
import { COLLECTIONS } from '../../config/dbConstants';
import { deleteRule } from './actions';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  btnArea: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: `${theme.spacing(2)}px 0`,
    fontSize: 12,
    '& $label': {
      fontSize: 12,
      '& span': {
        fontSize: 12
      }
    },
    '& button': {
      margin: `0 ${theme.spacing(1)}px`
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& button': {
        width: '100%',
        margin: 5
      }
    },
  },
});

/* eslint-disable react/prefer-stateless-function */
function ViewRegionalRules(props) {
  const {
    notifications, Delete, classes, auth, users
  } = props;
  if (!notifications || !users) {
    return (<Loading />);
  }
  const loadedUser = users.filter(user => user.email === auth.email)[0];
  const filteredNotifications = notifications.filter(notification => notification.from.id === loadedUser.id);
  const Rules = filteredNotifications.map(notification => (
    <PapperBlock key={notification.id} title={notification.title} desc={moment(notification.timestamp.toDate()).calendar()} whiteBg icon="ios-menu-outline">
      <br />
      {' '}
      {notification.description}
      <br />
      <div className={classes.btnArea}>

        <Button variant="contained" color="primary" size="large" type="submit" onClick={() => Delete(notification.id)}>
            Delete
        </Button>
      </div>

    </PapperBlock>
  ));
  const title = brand.name + ' - Regional Rules';
  const description = brand.desc;
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      {Rules}
    </div>
  );
}

ViewRegionalRules.propTypes = {
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
  dispatch: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  notifications: PropTypes.array,
  // eslint-disable-next-line react/require-default-props
  Delete: PropTypes.function,
  // eslint-disable-next-line react/require-default-props
  users: PropTypes.array
};
const reducerFirestore = 'firestore';

const mapStateToProps = (state) => ({
  auth: state.getIn(['firebase']).auth,
  notifications: state.get(reducerFirestore).ordered[COLLECTIONS.NOTIFICATION],
  users: state.get(reducerFirestore).ordered[COLLECTIONS.USER]
});

const mapDispatchToProps = (dispatch) => ({
  Delete: bindActionCreators(deleteRule, dispatch),
});


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'viewRegionalRules', reducer });
const withSaga = injectSaga({ key: 'viewRegionalRules', saga });

export default compose(
  firestoreConnect(() => [
    { collection: COLLECTIONS.NOTIFICATION },
    { collection: COLLECTIONS.USER }

  ]),
  withReducer,
  withSaga,
  withConnect
)(withStyles(styles)(ViewRegionalRules));
