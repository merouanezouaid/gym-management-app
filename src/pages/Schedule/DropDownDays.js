import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const names = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function DropDownDays({ onChange }) {
  const [daysOfWeek, setDaysOfWeek] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    onChange(value);
    setDaysOfWeek(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ width: 200 }}>
        <InputLabel id="recurring">Days Of Week</InputLabel>
        <Select
          labelId="recurring"
          id="demo-multiple-chip"
          multiple
          value={daysOfWeek}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="Days Of Week" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={names[value]} />
              ))}
            </Box>
          )}
        >
          {names.map((name) => (
            <MenuItem key={name} value={names.indexOf(name)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
