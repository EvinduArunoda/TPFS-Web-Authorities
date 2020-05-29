/**
 *
 * ConfirmCloseTicket
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withStyles } from '@material-ui/core';
import brand from 'dan-api/dummy/brand';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { PapperBlock } from 'dan-components';
import { Helmet } from 'react-helmet';
import Loading from 'dan-components/Loading';
import Button from '@material-ui/core/Button';
import reducer from './reducer';
import saga from './saga';
import { back } from '../HandleOpenTickets/actions';
import { confirmClose } from './actions';

const styles = theme => ({
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
function ConfirmCloseTicket(props) {
  const {
    classes, tktID, GoBack, loading, ConfirmClose
  } = props;
  const title = brand.name + ' - Handle Open Tickets';
  const description = brand.desc;
  const handleGoBack = () => {
    GoBack();
  };
  const handleClose = () => {
    ConfirmClose(tktID);
  };
  if (loading) {
    return (<Loading />);
  }
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
      <PapperBlock title="Confirmation" icon="ios-car-outline" whiteBg noMargin desc="Are you sure that you want to close this ticket?">
        <form>
          <div className={classes.btnArea}>
            <Button variant="contained" color="primary" type="button" onClick={handleClose}>
              Confirm
            </Button>
          </div>
        </form>
        <form>
          <div className={classes.btnArea}>
            <Button variant="contained" color="primary" type="button" onClick={handleGoBack}>
              Go Back
            </Button>
          </div>
        </form>
      </PapperBlock>

    </div>
  );
}

ConfirmCloseTicket.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types,react/require-default-props
  dispatch: PropTypes.func,
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/require-default-props
  tktID: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  GoBack: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  loading: PropTypes.boolean,
  // eslint-disable-next-line react/require-default-props
  ConfirmClose: PropTypes.func,
};
const tktReducer = 'openTktReducer';
const closeTicketReducer = 'closeTicket';

const mapStateToProps = (state) => ({
  tktID: state.getIn([tktReducer, 'id']),
  loading: state.getIn([closeTicketReducer, 'loading']),
});

const mapDispatchToProps = (dispatch) => ({
  GoBack: bindActionCreators(back, dispatch),
  ConfirmClose: bindActionCreators(confirmClose, dispatch),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'confirmCloseTicket', reducer });
const withSaga = injectSaga({ key: 'confirmCloseTicket', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(withStyles(styles)(ConfirmCloseTicket));
