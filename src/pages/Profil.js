import React, { PureComponent } from "react";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FaceIcon from "@mui/icons-material/Face";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import HomeIcon from "@mui/icons-material/Home";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EmailIcon from "@mui/icons-material/Email";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Container from '@mui/material/Container';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// -------------------------------------------------------

const GYM_PICS = [
{
  img: "https://i0.wp.com/stanzaliving.wpcomstaging.com/wp-content/uploads/2021/05/shutterstock_721723381-min.jpg",
  title: "gym",
},
{
  img: 'https://visitmorocconext.com/wp-content/uploads/2018/03/45688000_1145781102246542_6189081296971497472_n-1024x585.jpg',
  title: 'Burger',
},
{
  img: 'https://arc-anglerfish-arc2-prod-advancelocal.s3.amazonaws.com/public/XOHGZHSLXBA6ZMMLITG5AR73JU.png',
  title: 'Camera',
},
{
  img: 'https://cdn2.lamag.com/wp-content/uploads/sites/6/2020/03/los-angeles-gym-closed-danielle-cerullo-CQfNt66ttZM-unsplash.jpg',
  title: 'Coffee',
},
{
  img: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Rosemount%2C_MN_-_Anytime_Fitness_gym_exterior_%2843460728481%29.jpg',
  title: 'Hats',
},
{
  img: 'https://hagadone.media.clients.ellingtoncms.com/1016180733%200227%20Apex%20Gym%20BFH2_t1170.jpg',
  title: 'Honey',
}

]

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function Profil() {
  return (
    <Container>
      <Grid container spacing={2}>
        {/* First row start */}
        <Grid item xs={6} md={4}>
          <Card sx={{ maxWidth: 345, marginBottom: '3em'} }>
            <CardMedia
              component="img"
              height="140"
              image="https://i.ytimg.com/vi/kMT960nm3TQ/maxresdefault.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              Fitness Heroes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: Leader of fitness in Morocco! The best equipments and the best coaches at your service with the best quality-price ratio.
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 345, marginBottom: '3em'} }>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                About
              </Typography>
              <Stack spacing={0.5}>
                <Item>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <Item>
                        <HomeIcon />
                      </Item>
                    </Grid>
                    <Grid item xs={10}>
                      <Item>Agadir hay salam lbatwar</Item>
                    </Grid>
                  </Grid>
                </Item>
                <Item>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <Item>
                        <LocalPhoneIcon />
                      </Item>
                    </Grid>
                    <Grid item xs={10}>
                      <Item>0605261694</Item>
                    </Grid>
                  </Grid>
                </Item>
                <Item>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <Item>
                        <EmailIcon />
                      </Item>
                    </Grid>
                    <Grid item xs={10}>
                      <Item>outidrarinebachir@gmail.com</Item>
                    </Grid>
                  </Grid>
                </Item>
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 345, padding: "1rem", marginBottom: '3em' }}>
            <Item>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ marginBottom: "20px" }}
              >
                Sport Types
              </Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                <Chip
                  icon={<SportsMartialArtsIcon />}
                  label="Karate"
                  variant="outlined"
                  sx={{ marginBottom: "8px" }}
                />
                <Chip
                  icon={<SportsMmaIcon />}
                  label="Box"
                  variant="outlined"
                  sx={{ marginBottom: "8px" }}
                />
                <Chip
                  icon={<SportsKabaddiIcon />}
                  label="Full Contact"
                  variant="outlined"
                  sx={{ marginBottom: "8px" }}
                />
                <Chip
                  icon={<SportsKabaddiIcon />}
                  label="Full Contact"
                  variant="outlined"
                />
              </Stack>
            </Item>
          </Card>
        </Grid>
        {/* Second Item */}
        <Grid item xs={6} md={8}>
        <Container style={{ display: "flex", justifyContent: "space-around" }}>
            {/* First Item */}
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Pictures
                </Typography>
                <Stack spacing={2}>
                  <Item>
                  <ImageList cols={2} >
                    {GYM_PICS.map((item) => (
                      <ImageListItem key={item.img}>
                        <img
                          src={`${item.img}`}
                          srcSet={`${item.img}`}
                          alt={item.title}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                  </Item>
                </Stack>
              </CardContent>
            </Card>
            {/* Second Item */}
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Total Revenue
                </Typography>
                <Stack spacing={2}>
                  <Item>
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <Item>
                          <HomeIcon />
                        </Item>
                      </Grid>
                      <Grid item xs={10}>
                        <Item>Agadir hay salam lbatwar</Item>
                      </Grid>
                    </Grid>
                  </Item>
                </Stack>
              </CardContent>
            </Card>
          </Container>
        </Grid>
        {/* First row End */}
        {/* second row start */}

        {/* Second Item */}
        
        {/* second row End */}
        {/* Third row satrt */}
        
        {/* Second Item */}
        
        {/* Third row satrt */}
      </Grid>
    </Container>
  );
}

export default Profil;
