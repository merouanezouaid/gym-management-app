import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import * as formatDate from "../../utils/formatTime";

import MultiDropdown from "../../components/MultiDropdown";
import Dropdown from "../../components/Dropdown";

function PlanForm({ formData, setFormData }) {
  const sports = ["Taekwondo", "karate", "football", "full contact"];
  const category = ["Minim", "Cadet", "Junior", "Senior"];

  return (
    <div>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <MultiDropdown
              data={formData}
              setData={setFormData}
              names={sports}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Dropdown data={formData} setData={setFormData} names={category} />
          </Grid>
          {/* start date */}
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                id="startDate"
                value={formData.startDate || null}
                onChange={(e) => {
                  setFormData({ ...formData, startDate: e });
                }}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default PlanForm;
