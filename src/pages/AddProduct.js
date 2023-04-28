import * as React from "react";
import Axios from "axios"
import * as Yup from "yup";

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

import ProductForm from "./NewProduct/ProductForm";

import * as formatDate from "../utils/formatTime";

const steps = ["Product details"];

export default function AddProduct(props) {
  const [activeStep, setActiveStep] = React.useState(0);

  // Front End validation
  const MemberSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    birthday: Yup.date().required("Birthday is required"),
    phoneNumber: Yup.string()
      .required("required")
      .min(10, "too short")
      .max(10, "too long"),
    category: Yup.string().required("Category is required"),
    startDate: Yup.date().required("Start Date is required"),
  });

  // Memeber state as an object
  const [productData, setProductData] = React.useState({
      productName: "",
      originalPrice: "",
      category: "",
      qteStock: "",
      gender: "",
      ourPrice: "",
      colors:"",
      profilePic: "/static/illustrations/product.jpg",
  });

  // clear state after closing button and quitting the form
  const clearState = () => {
    setProductData({
      productName: "",
      originalPrice: "",
      category: "",
      qteStock: "",
      gender: "",
      ourPrice: "",
      colors:"",
      profilePic:"/static/illustrations/product.jpg",
    });
  };

  // FIXME: Form validation (RFH)
  const formik = useFormik({
    initialValues: productData,
    enableReinitialize: true,
    validationSchema: MemberSchema,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!props.edit){
      Axios.post(`${process.env.REACT_APP_API_URL}/api/products/`, productData).then(
          (response) => {}
      );
      Axios.post(`${process.env.REACT_APP_API_URL}/upload/products`, productData.profilePic, {}).then(
        (response) => {}
    );

    }
    else {
      Axios.patch(`${process.env.REACT_APP_API_URL}/api/products/${props.products._id}`, productData).then(
          (response) => {}
      );
      Axios.post(`${process.env.REACT_APP_API_URL}/upload/products`, productData.profilePic, {}).then(
        (response) => {}
    );
    }

    setActiveStep(activeStep + 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <ProductForm formData={productData} setFormData={setProductData} />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    // TODO: check if it's the last step then submit the form data
    setActiveStep(activeStep + 1);
    // console.log(productData);
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
              New Product
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
              <FormikProvider value={formik}>
                <Form autoComplete="off" onSubmit={handleSubmit}>
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
                          : handleNext  }
                        sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1 ? "Pay" : "Next"}
                    </Button>
                  </Box>
                </Form>
              </FormikProvider>
            )}
          </Box>
        </Container>
      </Dialog>
    </div>
  );
}

AddProduct.propTypes = {
  isOpen: PropTypes.string,
  toggle: PropTypes.string,
};
