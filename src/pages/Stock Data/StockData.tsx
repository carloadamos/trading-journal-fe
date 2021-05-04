import React, { useState } from 'react';
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
import axios, { AxiosResponse } from 'axios';

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

/* eslint-disable camelcase */
interface StockDataInterface {
  ticker_symbol: string;
  company_name: string;
  status: string;
}

const StockData: React.VoidFunctionComponent = () => {
  const classes = useStyles();
  const [stockData, setStockData] = useState<StockDataInterface[]>([]);

  let rowCount = 0;

  const downloadStockData = () => {
    axios
      .get('http://localhost:3002/api/stock/download')
      .then((response: AxiosResponse) => {
        const { data } = response;

        setStockData(data.stocks);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h2">Stock Data</Typography>
        </Grid>
        <Grid item xs={6} container direction="row" justify="flex-end" alignItems="flex-end">
          <Button variant="contained" color="primary" onClick={downloadStockData}>
            Download Data
          </Button>
        </Grid>
      </Grid>
      <Divider className={classes.divider} variant="middle" />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Stock Number</StyledTableCell>
              <StyledTableCell align="center">Ticker Symbol</StyledTableCell>
              <StyledTableCell align="center">Company Name</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockData.map((row) => {
              rowCount += 1;

              return (
                <StyledTableRow key={row.ticker_symbol}>
                  <StyledTableCell component="th" scope="row">
                    {rowCount}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="body1">{row.ticker_symbol}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="body1">{row.company_name}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography variant="body1">{row.status}</Typography>
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

export default StockData;
