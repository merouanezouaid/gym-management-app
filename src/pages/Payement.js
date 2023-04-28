import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Button,
  Container,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Axios from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";
import Iconify from "../components/Iconify";

import AddPayment from "./AddPayment";

function Payment() {
  const [open, setOpen] = useState(false);
  const [payments, setPayments] = useState([]);

  const columns = [
    {
      field: "avatar",
      headerName: "",
      width: 50,
      renderCell: (params) => (
        <Avatar alt="Member Avatar" src={params.row.member.profilePic} />
      ),
    },
    {
      field: "firstName",
      headerName: "First name",
      width: 200,
      valueGetter: (params) => params.row.member.firstName,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 200,
      valueGetter: (params) => params.row.member.lastName,
    },
    {
      field: "sport",
      headerName: "Sport Type",
      width: 200,
      valueGetter: (params) => params.row.sportType.name,
    },
    {
      field: "amount",
      headerName: "Paid amount",
      width: 150,
      valueGetter: (params) => `${params.row.amount} DH`,
    },
    {
      field: "date",
      headerName: "Date",
      width: 250,
      valueGetter: (params) =>
        new Date(params.row.date).toLocaleDateString("en-US"),
    },
  ];

  // Display Payment Playground
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/payment/`).then((response) => {
      setPayments(response.data);
    });
  }, [open]);

  const handlePayment = () => {
    setOpen(!open);
  };

  return (
    <Container>
      <Box sx={{ pb: 5 }}>
        <Typography variant="h4">Payment</Typography>
      </Box>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          mb={5}
          spacing={2}
        >
          <Button
            variant="contained"
            to="#"
            onClick={handlePayment}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Payment
          </Button>
          <AddPayment isOpen={open} toggle={handlePayment} />

          <Button
            variant="contained"
            to="#"
            startIcon={<RefreshIcon />}
            onClick={() =>
              console.log(
                "I'll refresh the page after the comeback of lbachir phone"
              )
            }
          >
            Refresh
          </Button>
        </Stack>
      </Container>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={payments}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </Container>
  );
}

export default Payment;
