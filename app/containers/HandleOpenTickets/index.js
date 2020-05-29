/**
 *
 * HandleOpenTickets
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { bindActionCreators, compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { PapperBlock } from 'dan-components';
import { withStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import { firestoreConnect, withFirebase } from 'react-redux-firebase';
import Loading from 'dan-components/Loading';
import Grid from '@material-ui/core/Grid';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ListIcon from '@material-ui/icons/List';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { COLLECTIONS } from '../../config/dbConstants';
import saga from './saga';
import reducer from './reducer';
import { setID, closeTicket } from './actions';


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  combo: {
    fullWidth: true
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
  rootList: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
});

/* eslint-disable react/prefer-stateless-function */
function HandleOpenTickets(props) {
  const {
    classes, users, auth, policeMen, tickets, AddPayment, CloseTicket
  } = props;
  if (!users || !policeMen || !tickets) {
    return (<Loading />);
  }

  const loadedUser = users.filter(user => user.email === auth.email)[0];
  const stationID = loadedUser.station_id;

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const [Type, setType] = React.useState('paid'); // set current year
  const handleTypeChange = event => {
    setType(event.target.value);
  };
  const [ticket, setTicket] = React.useState(null);
  const [licenseNumber, setLicenseNumber] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [amount, setAmount] = React.useState(null);
  const [offences, setOffences] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const handleOnChange1 = (event, value) => {
    setTicket(value);
    setLicenseNumber(value.LicenseNumber);
    if (value.Status === 'open') {
      setStatus('Not Paid');
    } else {
      setStatus('Paid');
    }
    setAmount(value.FineAmount);
    setOffences(value.Offences.map(Offence => (
      <ListItem>
        <ListItemText
          key={Offence}
          primary={Offence}
        />
      </ListItem>
    )));
    const Time = moment(value.Time.toDate()).calendar();
    setTime(Time);
  };
  const handleCloseTkt = () => {
    CloseTicket(ticket.id);
  };
  const handleAddPayment = () => {
    AddPayment(ticket.id);
  };
  console.log(ticket);

  const openTickets = tickets.filter(Ticket => Ticket.station_id === stationID && Ticket.Status === Type);

  const title = brand.name + ' - Handle Open Tickets';
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
      <PapperBlock title="Select the ticket" whiteBg icon="ios-create-outline" desc="Select Ticket Type and Driver License Number">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            Status
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={Type}
            onChange={handleTypeChange}
            labelWidth={labelWidth}
            style={{ minHeight: 55 }}
          >
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="open">Not Paid</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <Autocomplete
            id="combo-box-policeStation"
            options={openTickets}
            getOptionLabel={(option) => option.LicenseNumber}
            className={classes.combo}
            renderInput={(params) => (
              <TextField
                style={{ minWidth: 200 }}
                {...params}
                label="Select License Number"
                variant="outlined"
              />
            )}
            onChange={handleOnChange1}
          />
        </FormControl>
      </PapperBlock>
      { ticket !== null ? (
        <PapperBlock title={licenseNumber} icon="ios-car-outline" whiteBg noMargin desc={status}>
          <Divider className={classes.divider} />
          <List dense className={classes.profileList}>
            <ListItem key="amount">
              <ListItemAvatar>
                <Avatar>
                  <AttachMoneyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Fine Amount (in slr)" secondary={amount} />
            </ListItem>
            <ListItem key="offences">
              <ListItemAvatar>
                <Avatar>
                  <ListIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Offences" />
            </ListItem>
            <div className={classes.rootList}>
              <Grid item xs={12} md={6}>
                <div className={classes.demo}>
                  <List dense={false}>
                    {offences}
                  </List>
                </div>
              </Grid>
            </div>
            <ListItem key="Time">
              <ListItemAvatar>
                <Avatar>
                  <AccessTimeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Ticket Issued Time" secondary={time} />
            </ListItem>
            {/*    <ListItem> */}
            {/*      <ListItemAvatar> */}
            {/*        <Avatar> */}
            {/*          <SecurityIcon /> */}
            {/*        </Avatar> */}
            {/*      </ListItemAvatar> */}
            {/*      <ListItemText primary="Insurance Number" secondary={insuranceNumber} /> */}
            {/*    </ListItem> */}
          </List>
          {status === 'Not Paid' ? (
            <form>
              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" type="button" onClick={handleAddPayment}>
                Manual Payment
                </Button>
              </div>
            </form>
          ) : (
            <form>
              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" type="button" onClick={handleCloseTkt}>
                Close the Ticket
                </Button>
              </div>
            </form>
          ) }

        </PapperBlock>
      ) : (
        <PapperBlock title="Select a ticket" icon="ios-car-outline" whiteBg noMargin desc=" ">
          {' '}
        </PapperBlock>
      ) }
    </div>
  );
}

const reducerFirestore = 'firestore';

HandleOpenTickets.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  auth: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  users: PropTypes.array,
  // eslint-disable-next-line react/require-default-props
  policeMen: PropTypes.array,
  // eslint-disable-next-line react/require-default-props
  tickets: PropTypes.array,
  // eslint-disable-next-line react/require-default-props
  AddPayment: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  CloseTicket: PropTypes.func
};

const mapStateToProps = (state) => ({
  auth: state.getIn(['firebase']).auth,
  users: state.get(reducerFirestore).ordered[COLLECTIONS.USER],
  policeMen: state.get(reducerFirestore).ordered[COLLECTIONS.POLICEMAN],
  tickets: state.get(reducerFirestore).ordered[COLLECTIONS.TICKET],
});

const mapDispatchToProps = (dispatch) => ({
  AddPayment: bindActionCreators(setID, dispatch),
  CloseTicket: bindActionCreators(closeTicket, dispatch)
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'handleOpenTickets', reducer });
const withSaga = injectSaga({ key: 'handleOpenTickets', saga });

export default compose(
  withReducer,
  withSaga,
  firestoreConnect(() => [
    { collection: COLLECTIONS.USER },
    { collection: COLLECTIONS.TICKET },
    { collection: COLLECTIONS.POLICEMAN },
  ]),
  withConnect
)(withStyles(styles)(withFirebase(HandleOpenTickets)));
