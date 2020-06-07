/**
 *
 * SubmitPaymentDetails
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { PapperBlock } from 'dan-components';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import EnterPaymentDetails from '../EnterPaymentDetails';
import reducer from './reducer';
import saga from './saga';
import { submitPayment } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class SubmitPaymentDetails extends React.Component {
  render() {
    const { tktID, SubmitPayment } = this.props;
    const showResult = (values) => {
      console.log(values.get('receiptNo'), tktID);
      SubmitPayment(tktID, values.get('receiptNo'));
    };
    const title = brand.name + ' - Enter Payment Details';
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
        <PapperBlock title="Payment Details" desc="Enter receipt number">
          <EnterPaymentDetails onSubmit={values => showResult(values)} />
        </PapperBlock>
      </div>
    );
  }
}

SubmitPaymentDetails.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  tktID: PropTypes.String,
  // eslint-disable-next-line react/require-default-props
  SubmitPayment: PropTypes.func
};
const tktReducer = 'openTktReducer';
const mapStateToProps = (state) => ({
  tktID: state.getIn([tktReducer, 'id']),
});

const mapDispatchToProps = (dispatch) => ({
  SubmitPayment: bindActionCreators(submitPayment, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'submitPaymentDetails', reducer });
const withSaga = injectSaga({ key: 'submitPaymentDetails', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(SubmitPaymentDetails);
