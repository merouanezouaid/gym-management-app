import React from "react";

import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";

function PaymentForm({ formData, setFormData }) {
  // Format data means the object
  const { sportType } = formData;
  // credit
  const [checked, setChecked] = React.useState(false);

  return (
    <div>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              {sportType.map((el) => (
                <h2 key={el}>{el}</h2>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={0.5}>
              {sportType.map((el) => (
                <TextField
                  key={el}
                  id={el}
                  placeholder="Months"
                  type="number"
                  size="small"
                  sx={{ width: 100 }}
                />
              ))}
            </Stack>
          </Grid>
          {/* start date */}

          <Grid item xs={12} sm={6}>
            <TextField
              label="Total Amount"
              id="total"
              type="number"
              sx={{ m: 0, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">DHS</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              disabled={!checked}
              label="Credit"
              id="credit"
              type="number"
              sx={{ m: 0, width: "20ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">-DHS</InputAdornment>
                ),
              }}
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={checked}
                    onChange={(event) => {
                      setChecked(event.target.checked);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Credit"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
export default PaymentForm;

// number of months
// type de sport

// montant //credit switch button

PaymentForm.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func,
};
