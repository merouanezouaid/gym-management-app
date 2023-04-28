import * as React from "react";
import Axios from "axios"

import Dialog from "@mui/material/Dialog";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import "react-phone-input-2/lib/style.css";

import PropTypes from "prop-types";
import CloseButton from "../components/CloseButton";

import PersonalDetailsForm from "./NewTrainer/PersonalDetailsForm";

const steps = ["Personal Info"];



export default function AddTrainer(props) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleClose = () => {
    props.toggle();
    clearState();
    setTimeout(() => setActiveStep(0), 500);
  };

  const [trainerData, setTrainerData] = React.useState({
    profilePic: "",
    firstName: "",
    lastName: "",
    cin: "",
    birthday: "",
    email: "",
    phoneNumber: "",
    gender: "male",
  });
  

    // function to send which text will be in the button (add, edit, or next)
    const displayButton = () => {
      if(activeStep !== steps.length - 1){
        return 'Next';
      }
      if(props.edit){
        return 'Update Trainer'
      }
        return "Add Trainer";
    }

    const clearState = () => {
      setTrainerData({
        profilePic: "",
        firstName: "",
        lastName: "",
        cin: "",
        birthday: "",
        email: "",
        phoneNumber: "",
        gender: "male",
      });
    };


  const handleSubmit = (event) => {
    event.preventDefault();
    if(!props.edit){
      Axios.post(`${process.env.REACT_APP_API_URL}/api/trainers/`, trainerData).then(
          (response) => {}
      );
      Axios.post(`${process.env.REACT_APP_API_URL}/upload/trainer`, trainerData.profilePic, {}).then(
        (response) => {}
    );

    }
    else {
      Axios.patch(`/api/trainers/${props.trainer._id}`, trainerData).then(
          (response) => {}
      );
      Axios.post(`${process.env.REACT_APP_API_URL}/upload/trainer`, trainerData.profilePic, {}).then(
        (response) => {}
    );
    }

    setActiveStep(activeStep + 1);
  };


  function getStepContent(step) {
    switch (step) {
      case 0:
        return ( 
        <PersonalDetailsForm             
          formData={trainerData}
          setFormData={setTrainerData}
          trainer={props.trainer}
          edit={props.edit} /> );
      default:
        throw new Error("Unknown step");
    }
  }


  return (
    <div>
      <Dialog open={props.isOpen} onKeyDown={(e)=>{if(e.key === 'Escape'){
        props.toggle();
        clearState();
        setTimeout(() => setActiveStep(0), 500);
      }}}>
        <CloseButton
          onClose={handleClose}
        />
        
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 1,
              marginBottom: 2,
              marginLeft: 4,
              marginRight: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" gutterBottom>
            {props.edit ? 'Update' : 'New'} Trainer
            </Typography>

            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                Trainer {props.edit ? 'updated' : 'added'} successfully!!
                </Typography>
                {/* <Typography variant="subtitle1">
                </Typography> */}

                <Button
                  onClick={handleClose}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Done!!
                </Button>
              </>
            ) : (
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={
                    activeStep === steps.length - 1
                      ? handleSubmit
                      : handleNext
                    }
                    type={activeStep === steps.length - 1 ? "submit" : "button"}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {displayButton()}
                  </Button>
                </Box>
                </form>
            )}
          </Box>
        </Container>
      </Dialog>
    </div>
  );
}

AddTrainer.propTypes = {
  isOpen: PropTypes.string,
  toggle: PropTypes.string,
};
