import * as React from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DropdownPayment({ data, setData, names, months }) {
  const [info, setInfo] = React.useState("");
  const [info2, setInfo2] = React.useState("");

  const handleChange = (event) => {
    if(months) {
      setData({ ...data, months: event.target.value });
      setInfo(event.target.value);

    }
    else {
      setData({ ...data, sportType: event.target.value})
      setInfo2(event.target.value);
    } 
  };

  React.useEffect(() => {
    if(months) setInfo(data.months);
    else setInfo2(data.sportType);
  }, []);

  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel id="select-basic" size="small">
        {months ? "Months" : "Sports"}
      </InputLabel>
      <Select
        labelId="select-basic"
        id="demo-simple-select"
        value={months ? info : info2}
        label={months ? "Months" : "Sports"}
        onChange={handleChange}
        size="small"
      >
        {names.map((name) => (
          <MenuItem key={months ? name : name._id} value={months ? name : name._id}>
            {months ? name : name.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
