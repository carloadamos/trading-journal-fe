import React, { useState } from 'react';
import {
  Button,
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  })
);

const LogEntry = () => {
  const classes = useStyles();
  const currentDate = new Date();
  const [code, setCode] = useState('');
  const [tradeDate, setTradeDate] = useState(currentDate.toISOString().slice(0, 10));
  const [action, setAction] = useState('BUY');
  const [price, setPrice] = useState('0');
  const [shares, setShares] = useState('0');
  const [overrideFees, setOverrideFees] = useState('0');
  const [fees, setFees] = useState('0');
  const [net, setNet] = useState('0');
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trade = {
      action,
      code,
      fees,
      net,
      overrideFees,
      price,
      shares,
      tradeDate,
    };

    console.log('trade', trade);
  };
  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };
  const handleTradeDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTradeDate(event.target.value as string);
  };
  const handleActionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAction(event.target.value as string);
  };
  const handleSharesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShares(event.target.value);
  };
  const handleOverrideFeesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOverrideFees(event.target.value);
  };
  const handleFeesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFees(event.target.value);
  };
  const handleNetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNet(event.target.value);
  };
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField id="outlined-basic" onChange={handleCodeChange} value={code} label="Stock Code" variant="outlined" />
      <TextField
        variant="outlined"
        id="tradeDate"
        label="Trade Date"
        type="date"
        defaultValue={tradeDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleTradeDateChange}
      />
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={action}
          onChange={handleActionChange}
          label="Action"
        >
          <MenuItem value="BUY">BUY</MenuItem>
          <MenuItem value="SELL">SELL</MenuItem>
        </Select>
      </FormControl>
      <TextField id="outlined-basic" value={price} onChange={handlePriceChange} label="Price" variant="outlined" />
      <TextField id="outlined-basic" value={shares} onChange={handleSharesChange} label="Shares" variant="outlined" />
      <TextField
        id="outlined-basic"
        value={overrideFees}
        onChange={handleOverrideFeesChange}
        label="Override Fees"
        variant="outlined"
      />
      <TextField id="outlined-basic" value={fees} onChange={handleFeesChange} label="Fees" variant="outlined" />
      <TextField id="outlined-basic" value={net} onChange={handleNetChange} label="Net" variant="outlined" />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default LogEntry;
