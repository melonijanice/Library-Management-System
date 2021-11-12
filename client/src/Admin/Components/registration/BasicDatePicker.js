import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


export default function BasicDatePicker(props) {
  const [value, setValue] = React.useState(props.valueProp);
  
  const onChangeHandler=(newValue)=>
  {
    setValue(newValue);
  
    props.onChangeProp(newValue)
  }
  return (
    <LocalizationProvider  dateAdapter={AdapterDateFns}>
      <DatePicker 
        label={props.dateLabel}
        value={value}
        onChange={onChangeHandler}
        renderInput={(params) => <TextField {...params} error={props.errorProp}/>}
      />
    </LocalizationProvider>
  );
}