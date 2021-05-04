import React from 'react';
import {
  Button,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core';
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 700,
    },
    divider: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  })
);

// interface StockDataInterface {
//   code: string;
//   tradeDate: string;
//   open: string;
//   high: string;
//   low: string;
//   close: string;
//   volume: string;
// }

const StockHistory: React.VoidFunctionComponent = () => {
  const classes = useStyles();

  let rowCount = 0;

  // const downloadStockData = () => {
  //   axios
  //     .get('http://localhost:3002/api/stock/download')
  //     .then((response: AxiosResponse) => {
  //       const { data } = response;

  //       setStockData(data.stocks);
  //     })
  //     .catch((error) => {
  //       console.log('error', error);
  //     });
  // };

  const stockHistory = [
    {
      code: 'NOW',
      tradeDate: '2020-01-01',
      open: 100.5,
      high: 100.55,
      low: 100.44,
      close: 100.55,
      volume: 1023220,
    },
    {
      code: 'DITO',
      tradeDate: '2020-01-01',
      open: 100.5,
      high: 100.55,
      low: 100.44,
      close: 100.55,
      volume: 1023220,
    },
  ];

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h2">Stock History</Typography>
        </Grid>
        <Grid item xs={6} container direction="row" justify="flex-end" alignItems="flex-end">
          <Button variant="contained" color="primary">
            Download History
          </Button>
        </Grid>
      </Grid>
      <Divider className={classes.divider} variant="middle" />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Trade Number</StyledTableCell>
              <StyledTableCell align="center">Stock Code</StyledTableCell>
              <StyledTableCell align="center">Trade Date</StyledTableCell>
              <StyledTableCell align="center">Open</StyledTableCell>
              <StyledTableCell align="right">High</StyledTableCell>
              <StyledTableCell align="right">Low</StyledTableCell>
              <StyledTableCell align="right">Close</StyledTableCell>
              <StyledTableCell align="right">Volume</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockHistory.map((row) => {
              rowCount += 1;

              return (
                <StyledTableRow key={row.code}>
                  <StyledTableCell component="th" scope="row">
                    {rowCount}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="body1">{row.code}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="body1">{row.tradeDate}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="body1">
                      <NumberFormat value={row.open} displayType="text" thousandSeparator prefix="₱ " />
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography variant="body1">
                      <NumberFormat value={row.high} displayType="text" thousandSeparator prefix="₱ " />
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography variant="body1">
                      <NumberFormat value={row.low} displayType="text" thousandSeparator prefix="₱ " />
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography variant="body1">
                      <NumberFormat value={row.close} displayType="text" thousandSeparator prefix="₱ " />
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography variant="body1">{row.volume}</Typography>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StockHistory;
