/**
 *
 * TicketData
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import Loading from 'dan-components/Loading';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { firestoreConnect, withFirebase } from 'react-redux-firebase';
import { COLLECTIONS } from '../../config/dbConstants';
import styles from './tableStyle-jss';

/* eslint-disable react/prefer-stateless-function */
function TicketData(props) {
  const {
    classes, auth, users, tickets
  } = props;
  if (!users || !auth || !tickets) {
    return (<Loading />);
  }
  const loadedUser = users.filter(user => user.email === auth.email)[0];

  const today = new Date();
  const mm = String(today.getMonth()).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();

  const [Year, setYear] = React.useState(yyyy); // set current year
  const [Month, setMonth] = React.useState(mm); // set current month
  const [Type, setType] = React.useState('open'); // set type to 'open'
  const handleYearChange = event => {
    setYear(event.target.value);
  };
  const handleMonthChange = event => {
    setMonth(event.target.value);
  };
  const handleTypeChange = event => {
    setType(event.target.value);
  };
  const relatedTickets = tickets.filter(Ticket => Ticket.station_id === loadedUser.station_id && Ticket.Status === Type && moment(Ticket.Time.toDate()).month() === parseInt(Month, 10) && moment(Ticket.Time.toDate()).year() === parseInt(Year, 10));
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  return (
    <Fragment>
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            Type
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={Type}
            onChange={handleTypeChange}
            labelWidth={labelWidth}
          >
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="open">Not-Paid</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
            <MenuItem value="reported">Reported</MenuItem>
            <MenuItem value="due">Expired</MenuItem>

          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Year
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={Year}
            onChange={handleYearChange}
            labelWidth={labelWidth}
          >
            <MenuItem value="2020">2020</MenuItem>
            <MenuItem value="2021">2021</MenuItem>
            <MenuItem value="2022">2022</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2024">2024</MenuItem>

          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Month
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={Month}
            onChange={handleMonthChange}
            labelWidth={labelWidth}
          >
            <MenuItem value="00">January</MenuItem>
            <MenuItem value="01">February</MenuItem>
            <MenuItem value="02">March</MenuItem>
            <MenuItem value="03">April</MenuItem>
            <MenuItem value="04">May</MenuItem>
            <MenuItem value="05">June</MenuItem>
            <MenuItem value="06">July</MenuItem>
            <MenuItem value="07">August</MenuItem>
            <MenuItem value="08">September</MenuItem>
            <MenuItem value="09">October</MenuItem>
            <MenuItem value="10">November</MenuItem>
            <MenuItem value="11">December</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.rootTable}>
        <Table className={classNames(classes.table, classes.stripped)}>
          <TableHead>
            <TableRow>
              <TableCell padding="default">License Number</TableCell>
              <TableCell align="right">Offences</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {relatedTickets.map(n => ([
              <TableRow key={n.id}>
                <TableCell padding="default">{n.LicenseNumber}</TableCell>
                <TableCell align="right">{n.Offences.join()}</TableCell>
                <TableCell align="right">{moment(n.Time.toDate()).calendar()}</TableCell>
                <TableCell align="right">{n.FineAmount}</TableCell>
              </TableRow>
            ]))}
          </TableBody>
        </Table>
      </div>
    </Fragment>
  );
}

const reducerFirestore = 'firestore';

TicketData.propTypes = {
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  auth: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  users: PropTypes.array,
  // eslint-disable-next-line react/require-default-props
  tickets: PropTypes.array
};
const mapStateToProps = (state) => ({
  auth: state.getIn(['firebase']).auth,
  users: state.get(reducerFirestore).ordered[COLLECTIONS.USER],
  tickets: state.get(reducerFirestore).ordered[COLLECTIONS.TICKET]
});


export default compose(
  firestoreConnect(() => [
    { collection: COLLECTIONS.USER },
    { collection: COLLECTIONS.TICKET },
  ]),
  connect(
    mapStateToProps,
    // mapDispatchToProps
  ))(withStyles(styles)(withFirebase(TicketData)));
