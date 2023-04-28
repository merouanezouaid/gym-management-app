import React, { useState } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import { TextField, Container, Stack, Button, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

function Settings() {
  const [passwords, setPasswords] = useState({
    curr_password: null,
    password: null,
    confirm_password: null
  });

  const { enqueueSnackbar } = useSnackbar();

  const updatePassword = (event) => {
    event.preventDefault();

    if (passwords.password == null || passwords.password.trim() === '' || passwords.password !== passwords.confirm_password) {
      enqueueSnackbar("Please enter a valid password",  {
        variant: "error",
      });
      return;
    }

    const data = {
      passwords,
      email: JSON.parse(localStorage.getItem('user')).email
    }

    Axios.post(`${process.env.REACT_APP_API_URL}/api/auth/changePassword`, data).then(
        (response) => {
          enqueueSnackbar("Password changed Successfully!!", {
            variant: "success",
          });
        }
    ).catch(err => {
      if(err.response){
        enqueueSnackbar(err.response.data.message,  {
          variant: "error",
        });
      }
    });
  } 

  return (
    <Container>
      <Stack spacing={2}>
      <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>
        </Stack>
        <Typography variant="h6" >
            Update Password
          </Typography>
        <TextField
          required
          fullWidth
          value={passwords.curr_password || ""}
          id="curr-password"
          label="Password"
          name="curr_password"
          size="medium"
          type="password"
          // hadnle change goes here
          onChange={(e) => {
            setPasswords({ ...passwords, curr_password: e.target.value });
          }}
        />
        
        <TextField
          required
          fullWidth
          value={passwords.password || ""}
          id="password"
          label="New Password"
          name="password"
          size="medium"
          type="password"
          // hadnle change goes here
          onChange={(e) => {
            setPasswords({ ...passwords, password: e.target.value });
          }}
        />
        
        <TextField
          required
          fullWidth
          value={passwords.confirm_password || ""}
          id="confirm_password"
          label="Confirm New Password"
          name="confirm_password"
          autoComplete="password"
          size="medium"
          type="password"
          // hadnle change goes here
          onChange={(e) => {
            setPasswords({ ...passwords, confirm_password: e.target.value });
          }}
        />
         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={updatePassword}
          >
            Save
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}

export default Settings;
