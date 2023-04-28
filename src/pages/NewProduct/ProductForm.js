import React, { useState } from "react";

import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import { useFormik } from "formik";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import InputAdornment from "@mui/material/InputAdornment";
import ColorManyPicker from "../../components/ColorManyPicker";
import Dropdown from "../../components/Dropdown";
import DropdownGender from "../../components/DropdownGender";
import AvatarUpload from "../../components/AvatarUpload";

function ProductForm({ formData, setFormData }) {
  // Format data means the object
  const tag = ["All", "Shoes", "Apparel", "Accessories"];

  // Pcture dialog state
  const [open, setOpen] = React.useState(false);

  const genderDataDropDown = ["Men", "Women", "kids"];

  // open and close picture dialog
  const handleAvatar = () => {
    setOpen(!open);
  };

  const formik = useFormik({
    initialValues: {
      colors: "",
    },
  });

  const FILTER_COLOR_OPTIONS = [
    "#00AB55",
    "#000000",
    "#FFFFFF",
    "#FFC0CB",
    "#FF4842",
    "#1890FF",
    "#94D82D",
    "#FFC107",
  ];

  const values = [];

  const handleChangeColors = (e) => {
    formik.handleChange();
    setFormData({ ...formData, colors: formik.values.colors });
  };

  return (
    <div>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="productname"
              name="productname"
              onChange={(e) => {
                setFormData({ ...formData, productName: e.target.value });
              }}
              required
              fullWidth
              id="productname"
              label="Product name"
              size="small"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              id="price"
              type="number"
              onChange={(e) => {
                setFormData({ ...formData, originalPrice: e.target.value });
              }}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">DHS</InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Dropdown
              data={formData}
              setData={setFormData}
              names={tag}
              onChange={(e) => {
                setFormData({ ...formData, category: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="stock"
              name="stock"
              id="stock"
              type="number"
              label="Quantity in Stock"
              size="small"
              onChange={(e) => {
                setFormData({ ...formData, qteStock: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DropdownGender
              data={formData}
              setData={setFormData}
              names={genderDataDropDown}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="unit"
              name="unit"
              id="unit"
              type="number"
              label="Unit Price"
              size="small"
              onChange={(e) => {
                setFormData({ ...formData, ourPrice: e.target.value });
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">DHS</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ColorManyPicker
              name="colors"
              colors={FILTER_COLOR_OPTIONS}
              onChange={(e) => {
                formik.handleChange(e);
                setFormData({ ...formData, colors: formik.values.colors });
              }}
              onChecked={(color) => formik.values.colors.includes(color)}
              sx={{ maxWidth: 38 * 4 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleAvatar}>
              Upload Product Picture
            </Button>
            <AvatarUpload
              isOpen={open}
              toggle={handleAvatar}
              formData={formData}
              setFormData={setFormData}
              product
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
export default ProductForm;

ProductForm.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func,
};