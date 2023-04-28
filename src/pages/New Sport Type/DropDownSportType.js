import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DropDownSportType({
  names,
  label,
  handleChange,
  trainer,
}) {
  const [cat, setCat] = React.useState("");
  const [trainers, setTrainers] = React.useState("");

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
        value={trainer ? trainers : cat}
        onChange={(event) => {
          handleChange(event.target.value);
          if (trainer) setTrainers(event.target.value);
          else setCat(event.target.value);
        }}
        input={
          <OutlinedInput
            id="demo-simple-select"
            label={trainer ? "Trainer" : "Category"}
          />
        }
        size="small"
      >
        {names.map((name) => (
          <MenuItem
            key={trainer ? name._id : name}
            value={trainer ? name._id : name}
          >
            {trainer ? `${name.firstName} ${name.lastName}` : name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
