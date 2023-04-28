import * as React from "react";
import * as Yup from "yup";

import Axios from "axios";
import Dialog from "@mui/material/Dialog";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useFormik, Form, FormikProvider } from "formik";

import "react-phone-input-2/lib/style.css";

import PropTypes from "prop-types";
import CloseButton from "../components/CloseButton";

import PersonalDetailsForm from "./NewMember/PersonalDetailsForm";
import PlanForm from "./NewMember/PlanForm";
import PaymentForm from "./NewMember/PaymentForm";

import * as formatDate from "../utils/formatTime";


export default function AddMember(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  
  const steps = (!props.edit ? ["Personal Info", "Plan details", "Done"] : ["Personal Info"]);
  // const phoneRegExp =
  //   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  // // Front End validation
  // const MemberSchema = Yup.object().shape({
  //   firstName: Yup.string().required("First name is required"),
  //   lastName: Yup.string().required("Last name is required"),
  //   birthday: Yup.date().required("Birthday is required"),
  //   phoneNumber: Yup.string()
  //     .required("required")
  //     .matches(phoneRegExp, "Phone number is not valid")
  //     .min(10, "too short")
  //     .max(10, "too long"),
  //   category: Yup.string().required("Category is required"),
  //   startDate: Yup.date().required("Start Date is required"),
  // });

  // Memeber state as an object
  const [memberData, setMemberData] = React.useState({
    profilePic: "",
    firstName: "",
    lastName: "",
    cin: "",
    birthday: "",
    phoneNumber: "",
    gender: "male",
    sportType: [],
    category: "",
    startDate: "",
  });

  // function to send which text will be in the button (add, edit, or next)
  const displayButton = () => {
    if(activeStep !== steps.length - 1){
      return 'Next';
    }
    if(props.edit){
      return 'Update Member'
    }
      return "Add Member";
  }

  // clear state after closing button and quitting the form
  const clearState = () => {
    setMemberData({
      profilePic: "",
      firstName: "",
      lastName: "",
      cin: "",
      birthday: "",
      phoneNumber: "",
      gender: "male",
      sportType: [],
      category: "",
      startDate: "",
    });
  };

  // FIXME: I deleted Form validation because it's pain currently
  // TODO: low priority: Use RHF

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!props.edit){
      Axios.post(`${process.env.REACT_APP_API_URL}/api/members/`, memberData).then(
          (response) => {}
      );
      Axios.post(`${process.env.REACT_APP_API_URL}/upload/member`, memberData.profilePic, {}).then(
        (response) => {}
    );

    }
    else {
      Axios.patch(`${process.env.REACT_APP_API_URL}/api/members/${props.member._id}`, memberData).then(
          (response) => {}
      );
      Axios.post(`${process.env.REACT_APP_API_URL}/upload/member`, memberData.profilePic, {}).then(
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
            formData={memberData}
            setFormData={setMemberData}
            member={props.member}
            edit={props.edit}
          />
        );
      case 1:
        return <PlanForm formData={memberData} setFormData={setMemberData} member={props.member} />;
      case 2:
        return (
          <PaymentForm formData={memberData} setFormData={setMemberData} member={props.member} />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    // console.log(memberData);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleClose = () => {
    props.toggle();
    clearState();
    setTimeout(() => setActiveStep(0), 500);
  };

  return (
    <div>
      <Dialog open={props.isOpen} onKeyDown={(e)=>{if(e.key === 'Escape'){
        props.toggle();
        clearState();
        setTimeout(() => setActiveStep(0), 500);
      }else if(e.key === 'Enter'){
        if(activeStep !== 2)  handleNext();
      }
    }}>
        <CloseButton onClose={handleClose} />
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
              {props.edit ? 'Update' : 'New'} Member
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
                  Member {props.edit ? 'updated' : 'added'} successfully!!
                </Typography>
                {/* <Typography variant="subtitle1">
                </Typography> */}

                <Button
                  type="button"
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
                    <Button
                      type="button"
                      onClick={handleBack}
                      sx={{ mt: 3, ml: 1 }}
                    >
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

AddMember.propTypes = {
  isOpen: PropTypes.string,
  toggle: PropTypes.string,
};
