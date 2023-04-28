import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DropDownSportCat({
  sports,
  label,
  handleChange,
}) {
  const [sport, setSport] = React.useState("");


  // const handleChange = (event) => {
  //  console.log("dropDown changed");
  //  setCat(event.target.value);
  // };

  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel id="select-basic" size="small">
        {/* label of the dropDown list goes here */}
        {label}
      </InputLabel>
      <Select
        labelId="select-basic"
        id="demo-simple-select"
        value={sport}
        onChange={(event) => {
          handleChange(event.target.value);
          setSport(event.target.value);
        }}
        input={<OutlinedInput id="select-multiple-chip" label="Sport" />}
        size="small"
      >
        {!sports.length
          ? "Nothing found"
          : sports.map((name) => (
              <MenuItem key={name._id} value={name._id}>
                {name.name}
              </MenuItem>
            ))}
      </Select>
    </FormControl>
  );
}
