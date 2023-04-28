import React, {useEffect} from "react";

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

function PersonalDetailsForm({ formData, setFormData, trainer, edit }) {
  const [value, setValue] = React.useState(null);

  // Pcture dialog state
  const [open, setOpen] = React.useState(false);

  // open and close picture dialog
  const handleAvatar = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if(edit){
      setFormData({...formData, 
        firstName: trainer.firstName,
        lastName: trainer.lastName,
        cin: trainer.cin.toString(),
        email: trainer.email,
        birthday: trainer.birthday.toString(),
        phoneNumber: trainer.phoneNumber.toString(),
        gender: trainer.gender.toString()
       })
    }
}, [])



  return (
    <div>
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              fullWidth
              value={formData.firstName || ""}
              id="firstName"
              label="First Name"
              size="small"
              autoFocus
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={formData.lastName || "" }
              autoComplete="family-name"
              size="small"
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });  
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              value={formData.cin || "" }
              id="cin"
              label="CIN"
              name="cin"
              autoComplete="cin"
              size="small"
              // hadnle change goes here
              onChange={(e) => {
                setFormData({ ...formData, cin: e.target.value });
              }}
            />
          </Grid>
          {/* date de naissance */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of birth"
                id="dateOfBirth"
                value={formData.birthday || null}
                onChange={(e) => {
                  setFormData({ ...formData, birthday: e });
                }}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              value={formData.email || null}
              name="email"
              size="small"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <PhoneInput
              country="ma"
              value={formData.phoneNumber || ""  }
              id="phoneNumber"
              onChange={(e) => {
                setFormData({ ...formData, phoneNumber: e });
              }}
              inputStyle={{ width: "49%" }}
              placeholder="Phone Number"
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              value={formData.gender || "" }
              name="gender-group"
              size="small"
              onChange={(e) => {
                setFormData({ ...formData, gender: e.target.value });
              }}
            >
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel id="avatar">Avatar</FormLabel>
            {/* FIXME: Make the avatar src dynamic */}
            <Avatar
              sx={{ height: "70px", width: "70px" }}
              alt="avatar"
              id="avatar"
              src="/static/icons/ic_user.png"
            />
            <Button type="button" variant="contained" onClick={handleAvatar}>
              Upload
            </Button>
            <AvatarUpload
              isOpen={open}
              toggle={handleAvatar}
              formData={formData}
              setFormData={setFormData}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default PersonalDetailsForm;