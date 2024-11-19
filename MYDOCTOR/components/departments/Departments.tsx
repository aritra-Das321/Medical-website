import { useGetAllDeptsQuery } from "@/customHooks/cms.query.hooks";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Skeleton,
  Divider,
  CardActions,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import DepartmentDoctors from "../departmentDoctors/DepartmentDoctors";
import { grey, deepPurple, amber, indigo, deepOrange } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

// Styled components for Card and Accordion
const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.3s ease-in-out",
  width: "100%",
  maxWidth: "350px", // Increased max width for more spacious design
  backgroundColor: grey[900],
  color: grey[50],
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[8],
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: grey[800],
  color: grey[200],
  "&:before": {
    display: "none",
  },
  boxShadow: theme.shadows[3],
}));

const Departments = () => {
  const [selectedDept, setSelectedDept] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (dept: any) => {
    setSelectedDept(dept);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const { data: depts, isLoading } = useGetAllDeptsQuery();

  return (
    <Box
      p={{ xs: 2, md: 4 }}
      sx={{    position: "relative",
        borderRadius: "15px",
        mx: { xs: 0, md: 2 },
        // backgroundColor: deepPurple[900],
        mt: 2,
        backgroundImage: `url('/images/second.jpg')`, // Add your image path here
        backgroundSize: "cover", // Ensures the image covers the entire background
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat", // Ensures the image doesn't repeat
      }}
    >
      <Typography variant="h4" m={2} color='white' textAlign="center">
        Departments
      </Typography>
      {isLoading ? (
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {[1, 2, 3].map((_, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Skeleton
                variant="rectangular"
                height={200}
                sx={{ bgcolor: grey[700] }}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3} direction="row" wrap="nowrap" overflow="auto">
          {depts?.data.map((item) => (
            <Grid item key={item._id}>
              <StyledCard variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="div" color={amber[300]}>
                    {item.departmentName}
                  </Typography>
                  <Typography sx={{ color: grey[400], mb: 1.5 }}>
                    Assigned Doctors: {item.doctor_id.length}
                  </Typography>
                  <StyledAccordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon sx={{ color: amber[500] }} />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography>Description</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{item.description}</Typography>
                    </AccordionDetails>
                  </StyledAccordion>
                </CardContent>
                <Divider sx={{ backgroundColor: grey[700] }} />
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ backgroundColor: deepOrange[500], color: grey[50] }}
                    onClick={() => handleOpen({ id: item._id, name: item.departmentName })}
                  >
                    See Appointed Doctors
                  </Button>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
      {selectedDept && (
        <DepartmentDoctors open={open} handleClose={handleClose} dept={selectedDept} />
      )}
    </Box>
  );
};

export default Departments;
