import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
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
import { gql, useMutation } from '@apollo/client';

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

const ADD_TRADE = gql`
  mutation AddNewTrade($input: addTradeInput!) {
    addTrade(input: $input) {
      id
      tradeDate
      code
      action
      price
      shares
      overrideFees
    }
  }
`;

function NumberFormatCustom(props: any) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
    />
  );
}

const LogEntry: React.VoidFunctionComponent = () => {
  const classes = useStyles();
  const currentDate = new Date();
  const [code, setCode] = useState('');
  const [tradeDate, setTradeDate] = useState(currentDate.toISOString().slice(0, 10));
  const [action, setAction] = useState('BUY');
  const [price, setPrice] = useState(0);
  const [shares, setShares] = useState(0);
  const [overrideFees, setOverrideFees] = useState(0);
  const [fees, setFees] = useState(0);
  const [net, setNet] = useState(0);

  const [addTrade] = useMutation(ADD_TRADE);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const tradeInput = {
      tradeDate,
      code,
      action,
      price,
      shares,
      overrideFees,
    };

    addTrade({ variables: { input: tradeInput } });
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
    setShares(parseInt(event.target.value, 10) || 0);
  };
  const handleOverrideFeesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOverrideFees(parseFloat(event.target.value) || 0);
  };
  const handleFeesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFees(parseFloat(event.target.value) || 0);
  };
  const handleNetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNet(parseFloat(event.target.value) || 0);
  };
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseFloat(event.target.value) || 0);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
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
      <TextField
        id="outlined-basic"
        value={price}
        onChange={handlePriceChange}
        label="Price"
        variant="outlined"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
      <TextField
        id="outlined-basic"
        value={shares}
        onChange={handleSharesChange}
        label="Shares"
        variant="outlined"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
      <TextField
        id="outlined-basic"
        value={overrideFees}
        onChange={handleOverrideFeesChange}
        label="Override Fees"
        variant="outlined"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
      <TextField
        id="outlined-basic"
        value={fees}
        onChange={handleFeesChange}
        label="Fees"
        variant="outlined"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
      <TextField
        id="outlined-basic"
        value={net}
        onChange={handleNetChange}
        label="Net"
        variant="outlined"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default LogEntry;
