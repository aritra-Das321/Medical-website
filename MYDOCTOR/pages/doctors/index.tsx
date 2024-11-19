import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Stack,
  Grid2,
  Skeleton,
} from "@mui/material";
import Link from "next/link";
import { useAllDoctorList } from "@/customHooks/cms.query.hooks";
import DoctorDetails from "@/components/doctorDetails/DoctorDetails";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const { data: allDoctors, isLoading: isDoctorsLoading } = useAllDoctorList();

  if (isDoctorsLoading) {
    return (
      <Grid2 container spacing={2} p={2}>
        <Grid2 size={{ xs: 6, md: 3 }}>
          <Skeleton height="40vh" />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 3 }}>
          <Skeleton height="40vh" />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 3 }}>
          <Skeleton height="40vh" />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 3 }}>
          <Skeleton height="40vh" />
        </Grid2>
      </Grid2>
    );
  }

  const handleOpen = (doctor: any) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  function replaceBackslashes(input: string): string {
    return input.replace(/\\/g, "//");
  }

  return (
    <Box
      sx={{
        backgroundColor: "#121212", // Dark theme background
        backgroundImage: "url('/images/doctor-6701410_1920.jpg')", // Add your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        p: { xs: 1, md: 3 },
      }}
    >
      <Stack direction="row" spacing={1} m={4}>
        <Typography variant="h4" sx={{ color: "#fff" }}>
          Our
        </Typography>
        <Typography variant="h4" sx={{ color: "#90caf9" }}>
          Doctors
        </Typography>
      </Stack>
      <Grid container width="100%" p={{ xs: 0, md: 2 }} spacing={2}>
        {allDoctors?.data.map((item) => (
          <Grid item xs={6} sm={6} md={4} lg={3} key={item._id}>
            <Card
              sx={{
                height: "100%",
                width: "100%",
                backgroundColor: "#1e1e1e", // Dark card background
                color: "#fff", // Text color for the card
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)", // Slight zoom effect
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", // Box shadow on hover
                },
              }}
            >
              <CardMedia
                sx={{
                  height: 140,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                image={`https://doctor-app-bp0m.onrender.com/${replaceBackslashes(
                  item.image
                )}`}
                title={item.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ color: "#fff" }}>
                  {item.name}
                </Typography>
                <Typography variant="h6" sx={{ color: "#90caf9" }}>
                  {item.department_details[0].departmentName}
                </Typography>
                <Typography variant="body2" sx={{ color: "#b0bec5" }}>
                  Aperture time: {item.aperture_time}
                </Typography>
                <Typography variant="body2" sx={{ color: "#b0bec5" }}>
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
                      backgroundColor: "#1e88e5", // Professional blue
                      "&:hover": {
                        backgroundColor: "#1565c0", // Darker blue on hover
                      },
                    }}
                    onClick={() => handleOpen(item._id)}
                  >
                    See details
                  </Button>
                  <Link href={`/appointment/${item._id}`} style={{ width: "100%" }}>
                    <Button
                      size="small"
                      fullWidth
                      variant="contained"
                      sx={{
                        p: 1,
                        backgroundColor: "#6c757d", // Professional gray
                        "&:hover": {
                          backgroundColor: "#5a6268", // Darker gray on hover
                        },
                      }}
                    >
                      Take an appointment
                    </Button>
                  </Link>
                </Stack>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedDoctor && (
        <DoctorDetails open={open} handleClose={handleClose} doctor={selectedDoctor} />
      )}
    </Box>
  );
};

export default Index;
