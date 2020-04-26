import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { PapperBlock } from 'dan-components';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from 'dan-components/Loading';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import reducer from './reducer';
import saga from './saga';
import { COLLECTIONS } from '../../config/dbConstants';

const styles = {
  root: {
    flexGrow: 1
  }
};

function HandleComplaints(props) {
  const { complaints } = props;


  if (!complaints) {
    return (<Loading />);
  }

  const Complaints = complaints.map(complaint => (
    <PapperBlock key={complaint.id} title={complaint.title} desc={moment(complaint.timestamp.toDate()).calendar()} whiteBg icon="ios-menu-outline">
      <br />
      {' '}
      {complaint.description}
      <br />
      <Button variant="contained" color="primary" size="large" type="submit">
        Give FeedBack
      </Button>
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

      <PapperBlock>

        {Complaints}
      </PapperBlock>
    </div>
  );
}
HandleComplaints.propTypes = {
  // eslint-disable-next-line react/require-default-props
  complaints: PropTypes.array,
};
const reducerFirestore = 'firestore';

const mapStateToProps = (state) => ({
  auth: state.getIn(['firebase']).auth,
  complaints: state.get(reducerFirestore).ordered[COLLECTIONS.COMPLAINT]
});


const withConnect = connect(
  mapStateToProps,
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
