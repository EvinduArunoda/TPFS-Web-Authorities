/**
 *
 * AddRegionalRules
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { PapperBlock } from 'dan-components';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { connect } from 'react-redux';
import Loading from 'dan-components/Loading';
import { bindActionCreators, compose } from 'redux';
import RegionalRuleForm from '../../components/Forms/RegionalRules';
// import styles from './profile-jss';
import { submitRule } from './actions';
import saga from './saga';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class AddRegionalRules extends React.Component {
  showResult(values) {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.submitAction(this.props.auth.email, values.get('title'), values.get('description'));
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { loading } = this.props;
    if (loading) {
      return (<Loading />);
    }


    const title = brand.name + ' - Regional Rule Form';
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
        <PapperBlock title="Regional rule Form" desc="Fill all fields">
          <RegionalRuleForm onSubmit={values => this.showResult(values)} />
        </PapperBlock>
      </div>
    );
  }
}

AddRegionalRules.propTypes = {
  // eslint-disable-next-line react/require-default-props,react/no-unused-prop-types
  submitAction: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  auth: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  loading: PropTypes.boolean
};

const mapStateToProps = (state) => ({
  auth: state.getIn(['firebase']).auth,
  loading: state.getIn(['addRegionalRules', 'loading'])

});

const mapDispatchToProps = (dispatch) => ({
  submitAction: bindActionCreators(submitRule, dispatch),
});
const withSaga = injectSaga({ key: 'addRegionalRules', saga });
const withReducer = injectReducer({ key: 'addRegionalRules', reducer });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default compose(withConnect, withSaga, withReducer)(AddRegionalRules);
