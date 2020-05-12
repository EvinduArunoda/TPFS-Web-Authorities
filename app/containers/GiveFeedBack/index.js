import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import FeedBackForm from '../FeedBckForm';
import styles from './profile-jss';


class BlankPage extends React.Component {
  render() {
    // eslint-disable-next-line no-unused-vars
    const { classes } = this.props;

    const showResult = (values) => {
      console.log(values.get('FeedBack'));
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
};
export default withStyles(styles)(BlankPage);
