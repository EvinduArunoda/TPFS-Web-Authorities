import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { PapperBlock } from 'dan-components';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators, compose } from 'redux';
import FeedBackForm from '../FeedBckForm';
import styles from './profile-jss';
import { submitFeedBack } from './actions';
import saga from './saga';


class BlankPage extends React.Component {
  render() {
    // eslint-disable-next-line no-unused-vars
    const { classes, submitAction, ID } = this.props;

    const showResult = (values) => {
      console.log(values.get('FeedBack'), ID);
      submitAction(ID, values.get('FeedBack'));
    };

    const title = brand.name + ' - FeedBack Form';
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
        <PapperBlock title="Give FeedBack" desc="Enter your feedback">
          <FeedBackForm onSubmit={values => showResult(values)} />
        </PapperBlock>
      </div>
    );
  }
}
BlankPage.propTypes = {
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  submitAction: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  ID: PropTypes.String
};
const complaintReducer = 'complaintReducer';

const mapStateToProps = (state) => ({
  ID: state.getIn([complaintReducer, 'id'])
});

const mapDispatchToProps = (dispatch) => ({
  submitAction: bindActionCreators(submitFeedBack, dispatch),
});
const withSaga = injectSaga({ key: 'sendNotification', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(withConnect, withSaga)(withStyles(styles)(BlankPage));
