import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import { Container, Stack, Typography, Button } from "@mui/material";

import { values } from "lodash";

// components
import Axios from "axios";
import Page from "../components/Page";
import AddProduct from "./AddProduct";
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
} from "../sections/@dashboard/products";
import Iconify from "../components/Iconify";

//
import PRODUCTS from "../_mocks_/products";

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([...PRODUCTS]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/products/`).then((response) => {
      // console.log(response.data)
      setAllProducts([...response.data, ...PRODUCTS]);
      setProducts([...response.data, ...PRODUCTS]);
    });
  }, [open]);

  const formik = useFormik({
    initialValues: {
      gender: "",
      category: "",
      colors: "",
      priceRange: "",
      rating: "",
    },
    onSubmit: () => {
      setOpenFilter(false);
    },
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    // console.log(allProducts);
    handleSubmit();
    resetForm();
    setProducts(allProducts);
  };

  const handleReload = () => {
    handleSubmit();
    const searchResults = allProducts.filter((infos) => {
      const colors = formik.values.colors.concat(infos.colors);
      const mergedColors = new Set(colors);

      return mergedColors.size !== colors.length;
    });

    setProducts(searchResults);
  };

  const handleNewProduct = () => {
    setOpen(!open);
  };

  return (
    <Page title="Dashboard: Products | My Gym">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          mb={5}
          spacing={2}
        >
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleNewProduct}
          >
            New Product
          </Button>
        </Stack>

        <AddProduct isOpen={open} toggle={handleNewProduct} />
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              onReload={handleReload}
            />
            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={products} />
      </Container>
    </Page>
  );
}