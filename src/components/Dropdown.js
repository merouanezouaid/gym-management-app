import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Dropdown({ data, setData, names, ismember }) {
  const [cat, setCat] = React.useState();
  const [member, setMember] = React.useState();

  const handleChange = (event) => {
    if (ismember) {
      setData({ ...data, member: event.target.value });
      setMember(data.member);
    } else setData({ ...data, category: event.target.value });
  };

  React.useEffect(() => {
    if (ismember) setMember(data.member);
    else setCat(data.category);
  }, []);

  return (
    <FormControl sx={{ width: 200 }}>
      <InputLabel id="select-basic" size="small">
        {ismember ? "Member" : "Category"}
      </InputLabel>
      <Select
        labelId="select-basic"
        id="demo-simple-select"
        value={ismember ? member : cat}
        label={ismember ? "Member" : "Category"}
        onChange={handleChange}
        size="small"
      >
        {names.map((name) => (
          <MenuItem
            key={ismember ? name._id : name}
            value={ismember ? name._id : name}
          >
            {ismember ? `${name.firstName} ${name.lastName}` : name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
