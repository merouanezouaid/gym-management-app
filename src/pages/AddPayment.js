import * as React from "react";
import * as Yup from "yup";
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
import { useFormik, Form, FormikProvider } from "formik";

import PropTypes from "prop-types";
import CloseButton from "../components/CloseButton";

import PaymentForm from "./NewPayment/PaymentForm";

import * as formatDate from "../utils/formatTime";

const steps = ["Payment details"];

export default function AddPayment(props) {
  const [activeStep, setActiveStep] = React.useState(0);


  // Memeber state as an object
  const [paymentData, setPaymentData] = React.useState({
    amount: "",
    credit: "",
    months: "",
    sportType: "",
    member: "",
    date: Date.now()
  });

  // clear state after closing button and quitting the form
  const clearState = () => {
    setPaymentData({
      amount: "",
      credit: "",
      months: "",
      sportType: "",
      member: "",
      date: Date.now()
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post(`${process.env.REACT_APP_API_URL}/api/payment/`, paymentData).then(
      (response) => {}
    );

    handleNext();
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <PaymentForm formData={paymentData} setFormData={setPaymentData} />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    // console.log(paymentData);
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
        setTimeout(() => setActiveStep(0), 500);
      }}}>
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
              New Payment
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
                  The payment operation has successfully done!!
                </Typography>
                {/* <Typography variant="subtitle1">
                </Typography> */}

                <Button onClick={handleClose} sx={{ mt: 3, ml: 1 }}>
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
                      onClick={handleSubmit}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? "Pay" : "Next"}
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

AddPayment.propTypes = {
  isOpen: PropTypes.string,
  toggle: PropTypes.string,
};
