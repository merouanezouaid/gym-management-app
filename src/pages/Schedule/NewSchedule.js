import React, { useState, useEffect } from "react";

import Axios from "axios";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import CloseButton from "../../components/CloseButton";
import DropDownSportType from "../New Sport Type/DropDownSportType";
import DropDownSportCat from "./DropDownSportCat";
import DropDownDays from "./DropDownDays";

import { fDateSuffix, fDateToTime } from "../../utils/formatTime";

export default function NewSchedule(props) {
  const [value, setValue] = useState(Date.now());

  const [value2, setValue2] = useState(Date.now());

  // for all-day switch
  const [checked, setChecked] = React.useState(false);

  // fields states :

  const [newEvent, setNewEvent] = useState({
    title: "",
    trainer: "",
    sportType: "",
    start: "",
    end: "",
    daysOfWeek: [],
    startTime: "",
    endTime: "",
  });

  const handleClose = () => {
    props.toggle();
  };

  const [trainers, setTrainers] = useState();
  const [sportTypes, setSportTypes] = useState();

  // handle add :
  const handleAdd = (event) => {
    event.preventDefault();
    Axios.post(`${process.env.REACT_APP_API_URL}/api/schedule/`, newEvent).then(
      (response) => {}
    );

    handleClose();
  };

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/trainers/`).then((response) => {
      // set Trainer needs to go here
      setTrainers(response.data);
    });
    Axios.get(`${process.env.REACT_APP_API_URL}/api/sportTypes/`).then((response) => {
      // set sport Type needs to go here
      setSportTypes(response.data);
    });
  }, []);

  return (
    <div>
      <Dialog open={props.isOpen}>
        <CloseButton onClose={handleClose} />
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 1,
              marginBottom: 6,
              marginLeft: 4,
              marginRight: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ marginBottom: "2em" }}>
              New Event
            </Typography>
            <form onSubmit={handleAdd} encType="multipart/form-data">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="eventName"
                    required
                    fullWidth
                    id="eventName"
                    label="Title"
                    size="small"
                    autoFocus
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DropDownSportType
                    names={trainers}
                    label="Trainer"
                    handleChange={(data) =>
                      setNewEvent({ ...newEvent, trainer: data })
                    }
                    trainer
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DropDownSportCat
                    sports={sportTypes}
                    label="Sport"
                    handleChange={(data) =>
                      setNewEvent({ ...newEvent, sportType: data })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
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
                      label="All-day"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <DropDownDays
                    onChange={(data) =>
                      setNewEvent({
                        ...newEvent,
                        daysOfWeek: data,
                      })
                    }
                  />
                </Grid>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid item xs={12} sm={12}>
                    <DateTimePicker
                      label="Start Date"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                        if (checked) {
                          setNewEvent({
                            ...newEvent,
                            start: fDateSuffix(newValue),
                          });
                        } else if (newEvent.daysOfWeek.length) {
                          setNewEvent({
                            ...newEvent,
                            startTime: fDateToTime(newValue),
                          });
                        } else {
                          setNewEvent({ ...newEvent, start: newValue });
                        }
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <DateTimePicker
                      label="End Date"
                      value={value2}
                      onChange={(newValue) => {
                        setValue2(newValue);
                        if (checked) {
                          setNewEvent({
                            ...newEvent,
                            end: fDateSuffix(newValue),
                          });
                        } else if (newEvent.daysOfWeek.length) {
                          setNewEvent({
                            ...newEvent,
                            endTime: fDateToTime(newValue),
                          });
                        } else {
                          setNewEvent({ ...newEvent, end: newValue });
                        }
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                </LocalizationProvider>

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    type="submit"
                  >
                    Add Event
                  </Button>
                </Box>
              </Grid>
            </form>
          </Box>
        </Container>
      </Dialog>
    </div>
  );
}
