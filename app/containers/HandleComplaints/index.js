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
import { setID, flipRedirect } from './actions';

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

function HandleComplaints(props) {
  const {
    complaints, SetID, classes
  } = props;


  if (!complaints) {
    return (<Loading />);
  }
  console.log(complaints);

  const filteredComplaints = complaints.filter(element => element.status === 0);


  // const giveFeedBack = (id) => {
  //   SetID(id);
  // };

  const Complaints = filteredComplaints.map(complaint => (
    <PapperBlock key={complaint.id} title={complaint.title} desc={moment(complaint.timestamp.toDate()).calendar()} whiteBg icon="ios-menu-outline">
      <br />
      {' '}
      {complaint.description}
      <br />
      <div className={classes.btnArea}>

        <Button variant="contained" color="primary" size="large" type="submit" onClick={() => SetID(complaint.id)}>
        Give FeedBack
        </Button>
      </div>

    </PapperBlock>
  ));
  const title = brand.name + ' - Send Notifications';
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
      {Complaints}
    </div>
  );
}
HandleComplaints.propTypes = {
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  complaints: PropTypes.array,
  // eslint-disable-next-line react/require-default-props
  SetID: PropTypes.function,
  // eslint-disable-next-line react/require-default-props
  // flipRedirect: PropTypes.function,
};
const reducerFirestore = 'firestore';

const mapStateToProps = (state) => ({
  auth: state.getIn(['firebase']).auth,
  complaints: state.get(reducerFirestore).ordered[COLLECTIONS.COMPLAINT]
});

const mapDispatchToProps = (dispatch) => ({
  SetID: bindActionCreators(setID, dispatch),
  flipRedirect: bindActionCreators(flipRedirect, dispatch),
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducer = injectReducer({ key: 'handleComplaints', reducer });
const withSaga = injectSaga({ key: 'handleComplaints', saga });

export default compose(
  firestoreConnect(() => [
    { collection: COLLECTIONS.COMPLAINT }

  ]),
  withReducer,
  withSaga,
  withConnect
)(withStyles(styles)(HandleComplaints));
