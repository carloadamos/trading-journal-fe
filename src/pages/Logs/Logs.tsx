import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CircularProgress } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import NumberFormat from 'react-number-format';

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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Trade {
  id: number;
  tradeDate: string;
  code: string;
  action: string;
  price: string;
  shares: string;
  overrideFees: string;
  net: string;
  fees: string;
}

interface TradeData {
  tradeLogs: Trade[];
}

const GET_TRADES = gql`
  query GetTrades {
    tradeLogs {
      id
      tradeDate
      code
      action
      price
      shares
      overrideFees
      net
      fees
    }
  }
`;

const Logs: React.VoidFunctionComponent = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery<TradeData>(GET_TRADES);
  let rowCount = 0;

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error with GraphQL!</Alert>;

  if (data) {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Trade Number</StyledTableCell>
              <StyledTableCell align="center">Stock Code</StyledTableCell>
              <StyledTableCell align="center">Trade Date</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Shares</StyledTableCell>
              <StyledTableCell align="right">Override Fee</StyledTableCell>
              <StyledTableCell align="right">Fees</StyledTableCell>
              <StyledTableCell align="right">Net</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.tradeLogs.map((row) => {
              rowCount += 1;

              return (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {rowCount}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.code}</StyledTableCell>
                  <StyledTableCell align="center">{row.tradeDate}</StyledTableCell>
                  <StyledTableCell align="center">{row.action}</StyledTableCell>
                  <StyledTableCell align="right">
                    <NumberFormat value={row.price} displayType="text" thousandSeparator prefix="₱ " />
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.shares}</StyledTableCell>
                  <StyledTableCell align="right">
                    <NumberFormat value={row.overrideFees} displayType="text" thousandSeparator prefix="₱ " />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <NumberFormat value={row.fees} displayType="text" thousandSeparator prefix="₱ " />
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <NumberFormat value={row.net} displayType="text" thousandSeparator prefix="₱ " />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return <div>No data</div>;
};

export default Logs;
