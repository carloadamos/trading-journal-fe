import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

function createData(
  tradeNo: number,
  code: string,
  tradeDate: string,
  action: string,
  price: string,
  shares: string,
  overrideFees: string,
  fees: string,
  net: string
) {
  return { tradeNo, code, tradeDate, action, price, shares, overrideFees, fees, net };
}

const rows = [
  createData(1, 'NOW', '2020-01-01', 'BUY', '10.5', '1000', '10', '10', '10000'),
  createData(2, 'NOW', '2020-01-01', 'BUY', '10.0', '1000', '10', '10', '10000'),
  createData(3, 'NOW', '2020-01-01', 'BUY', '10.0', '1000', '10', '10', '10000'),
  createData(4, 'NOW', '2020-01-01', 'BUY', '10.0', '1000', '10', '10', '10000'),
  createData(5, 'NOW', '2020-01-01', 'BUY', '10.0', '1000', '10', '10', '10000'),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Logs() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Trade No.</StyledTableCell>
            <StyledTableCell align="center">Stock Code</StyledTableCell>
            <StyledTableCell align="center">Trade Date</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
            <StyledTableCell align="center">Price</StyledTableCell>
            <StyledTableCell align="center">Shares</StyledTableCell>
            <StyledTableCell align="center">Override Fee</StyledTableCell>
            <StyledTableCell align="center">Fees</StyledTableCell>
            <StyledTableCell align="center">Net</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.code}>
              <StyledTableCell component="th" scope="row">
                {row.tradeNo}
              </StyledTableCell>
              <StyledTableCell align="center">{row.code}</StyledTableCell>
              <StyledTableCell align="center">{row.tradeDate}</StyledTableCell>
              <StyledTableCell align="center">{row.action}</StyledTableCell>
              <StyledTableCell align="center">{row.price}</StyledTableCell>
              <StyledTableCell align="center">{row.shares}</StyledTableCell>
              <StyledTableCell align="center">{row.overrideFees}</StyledTableCell>
              <StyledTableCell align="center">{row.fees}</StyledTableCell>
              <StyledTableCell align="center">{row.net}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
