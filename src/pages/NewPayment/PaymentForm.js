import React, {useEffect} from "react";
import Axios from "axios"
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import Button from "@mui/material/Button";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import DropDownPayment from "../../components/DropDownPayment";
import DropDown from "../../components/Dropdown";

function PaymentForm({formData, setFormData}) {
  // credit
  const [checked, setChecked] = React.useState(false);  // Data for testing
  const [memberData, setMemberData] = React.useState([]);
  const [sportData, setSportData] = React.useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/members/`).then((response) => {
      // set Trainer needs to go here
      setMemberData(response.data);
    })
    Axios.get(`${process.env.REACT_APP_API_URL}/api/sportTypes/`).then((response) => {
      // set Trainer needs to go here
      setSportData(response.data);
    })
  
  }, []);





  const monthsData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


  return (
    <div>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            {/* textfield as a search, you search for the user and then we'll 
           fetch sporttypes, category and number of months from database, 
           then we'll enter the amount and the credit etc.. */}
            <DropDown
              names={memberData}
              data={formData}
              setData={setFormData}
              ismember 
           />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={0.5}>
              <DropDownPayment
                names={sportData}
                data={formData}
                setData={setFormData}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DropDownPayment
              months
              names={monthsData}
              data={formData}
              setData={setFormData}
            />
          </Grid>
          <Grid item xs={12} sm={6} />

          <Grid item xs={12} sm={6}>
            <TextField
              label="Total Amount"
              id="total"
              type="number"
              value={formData.amount || "" }
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
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
              onChange={(e) => setFormData({ ...formData, credit:  Number(e.target.value) })}
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