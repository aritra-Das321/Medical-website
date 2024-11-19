import { Stack, Box, IconButton, Card, CardContent, CardMedia, Typography, CardActions, Button, Grid2, useMediaQuery, useTheme, Skeleton } from "@mui/material";
import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useAllDoctorList } from "@/customHooks/cms.query.hooks";
import DoctorDetails from "../doctorDetails/DoctorDetails";
import Link from "next/link";
import Slider from "react-slick";

// Ensure to define the Doctor type or interface if not already defined
interface doctorDeptDetails {
  departmentName: string;
}
interface Doctor {
  _id: number;
  name: string;
  department_details: doctorDeptDetails[];
  aperture_time: string;
  departure_time: string;
  image: string;
}

const DoctorsComponent: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (doctor: any) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const { data: allDoctors, isLoading: isDoctorsLoading } = useAllDoctorList();
  const theme = useTheme();
  const isMdOrUpper = useMediaQuery(theme.breakpoints.up("md"));

  function replaceBackslashes(input: string): string {
    return input.replace(/\\/g, '//');
  }

  // Settings for the carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMdOrUpper ? 3 : 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds for each slide
    pauseOnHover: true,
    centerMode: true, // Centers the current slide
    centerPadding: "16px" // Padding on each side of the centered slide
  };

  return (
    <Box
      sx={{ margin:4,
        p: { xs: 0, lg: 4 },
        mx: { xs: 0, lg: 2 },
        bgcolor: "#7ADCC0", // Light blue background
        borderRadius: "15px",
        position: "relative",
        border: "2px solid #00bcd4", // Border color
        boxShadow: 3
      }}
    >
      <Box
  sx={{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center the title horizontally
    width: "100%",
    mb: 2,
    position: "relative", // Necessary for the button positioning
  }}
>
  <Stack direction="row" spacing={1} m={4} alignItems="center">
    <Typography variant="h4" sx={{ color: "#4caf50" }}>Our</Typography>
    <Typography variant="h4" sx={{ color: "yellow" }}>Doctors</Typography>
  </Stack>
  <Button
    variant="contained"
    sx={{
      backgroundColor: "#ff4081",
      position: "absolute",
      right: { xs: "0.5rem", md: "1.5rem" }, // Keep the "More" button on the right
      "&:hover": {
        backgroundColor: "#43ea2c",
      },
    }}
  >
    MORE
  </Button>
</Box>

      {isDoctorsLoading ? (
        <Grid2 container spacing={2} direction="row" width="50%">
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
            <Skeleton variant="rectangular" width='300px' height='200px' />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Skeleton variant="rectangular" width='300px' height='200px' />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 4 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Skeleton variant="rectangular" width='300px' height='200px' />
          </Grid2>
        </Grid2>
      ) : (
        <Slider {...settings}>
          {allDoctors?.data.map((item: Doctor) => (
            <Card
            sx={{
              height: "auto",
              width: "250px",
              margin: "2 8px",
              borderRadius: "10px",
              border: "10px solid #ff4081",
              transition: "all 0.3s ease",
              transform: "scale(1)", // Default scale
              "&:hover": {
                backgroundColor: "#ffebee",
                borderColor: "#e91e63",
                boxShadow: 10,
                transform: "scale(1.05)", // Slightly larger on hover
              },
            }}
            key={item._id}
          >
            <CardMedia
              sx={{ height: 300, backgroundSize: "cover" }}
              image={`https://doctor-app-bp0m.onrender.com/${replaceBackslashes(item.image)}`}
              title={item.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div" sx={{ color: "#4caf50" }}>
                {item.name}
              </Typography>
              <Typography variant="body1" sx={{ color: "#3d5a80" }}>
                {item.department_details[0].departmentName}
              </Typography>
              <Typography variant="body2" sx={{ color: "#616161" }}>
                Aperture time: {item.aperture_time}
              </Typography>
              <Typography variant="body2" sx={{ color: "#616161" }}>
                Departure time: {item.departure_time}
              </Typography>
            </CardContent>
            <CardActions>
              <Stack alignItems="center" justifyContent="center" width="100%">
                <Button
                  size="small"
                  fullWidth
                  variant="contained"
                  sx={{
                    mb: 2,
                    p: 1,
                    backgroundColor: "#ff4081",
                    "&:hover": { backgroundColor: "#e91e63" },
                  }}
                  onClick={() => handleOpen(item._id)}
                >
                  See Details
                </Button>
                <Link href={`/appointment/${item._id}`} style={{ width: "100%" }}>
                  <Button
                    size="small"
                    fullWidth
                    variant="contained"
                    sx={{
                      p: 1,
                      backgroundColor: "#00bcd4",
                      "&:hover": { backgroundColor: "#0097a7" },
                    }}
                    color="secondary"
                  >
                    Take an Appointment
                  </Button>
                </Link>
              </Stack>
            </CardActions>
          </Card>
          
          ))}
        </Slider>
      )}
      {selectedDoctor && (
        <DoctorDetails
          open={open}
          handleClose={handleClose}
          doctor={selectedDoctor}
        />
      )}
    </Box>
  );
};

export default DoctorsComponent;
