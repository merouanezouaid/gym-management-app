import React, { useState, useEffect } from "react";

import Axios from "axios";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";

import CloseButton from "../../components/CloseButton";
import AvatarUpload from "../../components/AvatarUpload";
import DropDownSportType from "./DropDownSportType";

function AddSportType(props) {
  const [value, setValue] = React.useState(null);

  // Pcture dialog state
  const [open, setOpen] = React.useState(false);

  // open and close picture dialog
  const handleAvatar = () => {
    setOpen(!open);
  };

  // fields states :

  const [sportType, setSportType] = React.useState({
    name: "",
    category: "",
    trainerid: "",
    description: "",
    sportPic: "https://www.beachvillas.com/travel/wp-content/uploads/2020/11/Return_of_Sports.jpg",
  });

  const handleClose = () => {
    props.toggle();
  };

  const [trainers, setTrainers] = useState();

  // handle add :
  const handleAdd = (event) => {
    event.preventDefault();
    console.log(sportType);
    Axios.post(`${process.env.REACT_APP_API_URL}/api/sportTypes/`, sportType).then(
      (response) => {}
    );

    Axios.post(
      " /upload/sportType",
      sportType.sportPic,
      {}
    ).then((response) => {});

    handleClose();
  };

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/trainers/`).then((response) => {
      // set Trainer needs to go here
      setTrainers(response.data);
    });
  }, []);

  const categoryData = ["Minim", "Cadet", "Junior", "Senior"];

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
              New Sport Type
            </Typography>
            <form onSubmit={handleAdd} encType="multipart/form-data">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="sportName"
                    required
                    fullWidth
                    id="sportName"
                    label="Sport Name"
                    size="small"
                    autoFocus
                    onChange={(e) =>
                      setSportType({ ...sportType, name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DropDownSportType
                    names={categoryData}
                    label="Category"
                    handleChange={(data) =>
                      setSportType({ ...sportType, category: data })
                    }
                  />
                </Grid>
                {/* date de naissance */}
                <Grid item xs={12}>
                  <DropDownSportType
                    names={trainers}
                    label="Trainers"
                    handleChange={(data) =>
                      setSportType({ ...sportType, trainerid: data })
                    }
                    trainer
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Desc"
                    multiline
                    rows={4}
                    onChange={(e) =>
                      setSportType({
                        ...sportType,
                        description: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormLabel>Sport Picture</FormLabel>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={handleAvatar}
                  >
                    Upload
                  </Button>
                  <AvatarUpload
                    isOpen={open}
                    toggle={handleAvatar}
                    formData={sportType}
                    setFormData={setSportType}
                    sport
                  />
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                    type="submit"
                  >
                    Add Sport Type
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

export default AddSportType;
