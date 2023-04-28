import React, { useEffect } from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import Avatar from "@mui/material/Avatar";

import PhoneInput from "react-phone-input-2";
import AvatarUpload from "../../components/AvatarUpload";

function PersonalDetailsForm({ formData, setFormData, edit }) {
  const [value, setValue] = React.useState(null);

  // Pcture dialog state
  const [open, setOpen] = React.useState(false);

  // open and close picture dialog
  const handleAvatar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (edit) {
      setFormData({
        ...formData,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
    }
  }, []);

  return (
    <div>
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <TextField
            required
              autoComplete="given-name"
              name="username"
              fullWidth
              value={formData.username || ""}
              id="username"
              label="Username"
              size="small"
              autoFocus
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
              }}
            />
          </Grid>

          <Grid item xs={12} >
            <TextField
            required
              fullWidth
              id="email"
              label="Email"
              type="email"
              value={formData.email || null}
              name="email"
              size="small"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
          </Grid>

          <Grid item xs={12} >
            <TextField
              required
              fullWidth
              value={formData.password || ""}
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              size="small"
              // hadnle change goes here
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </Grid>
 
        </Grid>
      </Box>
    </div>
  );
}

export default PersonalDetailsForm;