import { useState, useContext, useEffect } from "react";
import Axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid, Stack } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Iconify from "../components/Iconify";
import AddSportType from "./New Sport Type/AddSportType";


function SportTypes() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/sportTypes/`).then((response) => {
      setSportTypes(response.data);
      // console.log(response.data);
    });
  }, [open, menu]);

  const [sportTypes, setSportTypes] = useState([]);

  const handleNewUser = () => {
    setOpen(!open);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete this sport type ?`)) {
      // Save it!
      Axios.delete(`${process.env.REACT_APP_API_URL}/api/sportTypes/${id}`).then(
        (response) => {
          if (response.message) {
            console.log("An error has occured");
          } else {
            // rerender table component
            setMenu(!menu);
          }
        }
      );
    } else {
      // Do nothing!
      console.log("Nothing was done.");
    }
  };

  return (
    <Container>
      <Box sx={{ pb: 5 }}>
        <Typography variant="h4">Sport Types</Typography>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Button
          variant="contained"
          component={RouterLink}
          to="#"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleNewUser}
        >
          New Sport type
        </Button>
      </Stack>
      <AddSportType isOpen={open} toggle={handleNewUser} />

      <Grid container spacing={3}>
        {sportTypes.length === 0 ? (
          <Box m={2} pt={3}>
            <Typography align="center" variant="h3" component="div">
              No sport types found
            </Typography>
          </Box>
        ) : (
          sportTypes.map((row) => (
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={row.sportPic}
                  alt="Sport Picture"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {row.name}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {row.firstName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {row.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={()=> navigate("/dashboard/callender", { replace: true })}>Go to Schedule</Button>
                  <Button size="small" onClick={() => handleDelete(row._id)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default SportTypes;
