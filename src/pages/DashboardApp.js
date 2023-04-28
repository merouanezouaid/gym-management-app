// material
import { useState, useEffect } from "react";
import Axios from "axios";
import { Box, Grid, Container, Typography } from "@mui/material";
// components
import Page from "../components/Page";
import {
  AppTasks,
  AppNewUsers, // total trainers
  AppBugReports, // total income
  AppItemOrders, // unpaid credit members
  AppNewsUpdate,
  AppWeeklySales, // monthly members
  AppOrderTimeline,
  AppCurrentVisits, // sports per income
  AppWebsiteVisits, // monthly subscribers
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
} from "../sections/@dashboard/app";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/dashboard`).then((response) => {
      setData(response.data);
      // console.log(response.data.table);
    });
  }, []);

  return (
    <Page title="Dashboard | My Gym">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales data={data.membersCount} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers data={data.trainersCount} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports data={data.unpaidCount} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders data={data.totalIncome} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits data={data.table} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits data={data.sportTypesByIncome} />
          </Grid>

          <Grid item xs={12}>
            <AppConversionRates data={data.sportsByMembers} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate data={data.notifications} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline data={data.todaySchedule} />
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
