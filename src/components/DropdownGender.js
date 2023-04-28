import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function DropdownGender({ data, setData, names }) {
  const [gender, setGender] = React.useState();

  const handleChange = (event) => {
    setData({ ...data, gender: event.target.value });
    setGender(data.gender);
  };

  React.useEffect(() => {
    setGender(data.gender);
  }, []);

  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel id="select-basic" size="small">
        Gender
      </InputLabel>
      <Select
        labelId="select-basic"
        id="demo-simple-select"
        value={gender}
        label="Gender"
        onChange={handleChange}
        size="small"
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}