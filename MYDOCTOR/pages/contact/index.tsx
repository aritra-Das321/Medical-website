import { useForm } from "react-hook-form";
import { IContactUsPayload } from '@/typescript/cms.interface';
import { Box, Grid, Paper, Typography, TextField, Button } from '@mui/material';
import dynamic from 'next/dynamic';
import React from 'react';
import { useContactUsMutation } from "@/customHooks/cms.query.hooks";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
  const Map = dynamic(() => import('@/components/map/Map'), { ssr: false });
  const { register, handleSubmit, formState: { errors } } = useForm<IContactUsPayload>();

  const { mutate, isPending, isSuccess } = useContactUsMutation();

  const onSubmit = (formData: IContactUsPayload) => {
    const formdata = new URLSearchParams();
    formdata.append("name", formData.name);
    formdata.append("email", formData.email);
    formdata.append("topic", formData.topic);
    formdata.append("phone", formData.phone);
    formdata.append("msg", formData.msg);
    mutate(formdata.toString());

    if (isSuccess) {
      toast.success("Contact created successfully");
    }
  };

  const fadeUpAnimation = {
    animation: `fadeIn 1s ease-in-out`,
    '@keyframes fadeIn': {
      from: { opacity: 0 },
      to: { opacity: 1 }
    }
  };

  const overlayStyle = {
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for contrast
    zIndex: 1,
  };

  const textContentStyle = {
    position: 'relative' as 'relative',
    zIndex: 2,
    color: '#ffffff', // Bright white text
  };

  const inputTextStyle = {
    '& .MuiInputLabel-root': {
      color: '#ffffff', // Bright white for label text
    },
    '& .MuiOutlinedInput-root': {
      color: '#ffffff', // Bright white for input text
      '& fieldset': {
        borderColor: '#ffffff', // Bright white border
      },
      '&:hover fieldset': {
        borderColor: '#ffffff',
      },
    },
    '& .MuiFormHelperText-root': {
      color: '#ffffff', // Bright white for helper text
    }
  };

  return (
    <>
      <ToastContainer />
      <Grid container width='100%' p={2} spacing={2}>
        <Grid item xs={12} md={6}>
          <Map />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={6}
            sx={{
              position: 'relative',
              px: 4,
              py: 3,
              width: '100%',
              textAlign: 'center',
              backgroundImage: `url('/images/pexels-thirdman-5327653.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              color: '#ffffff', // Bright white text for Paper component
              ...fadeUpAnimation,
            }}
          >
          
            <Box sx={overlayStyle} />
            <Box sx={textContentStyle}>
              <Typography variant="h5" gutterBottom>
                Contact Us
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  {...register("name", { required: "First name is required" })}
                  label="Name"
                  type="text"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  sx={inputTextStyle}
                />
                <TextField
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Invalid email format",
                    },
                  })}
                  label="Your Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={inputTextStyle}
                />
                <TextField
                  {...register("topic", { required: "Topic is required" })}
                  label="Topic"
                  type="text"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={!!errors.topic}
                  helperText={errors.topic?.message}
                  sx={inputTextStyle}
                />
                <TextField
                  {...register("phone", { required: "Phone number is required" })}
                  label="Phone No"
                  type="number"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  sx={inputTextStyle}
                />
                <TextField
                  {...register("msg", { required: "Message is required" })}
                  label="Message"
                  type="text"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={!!errors.msg}
                  helperText={errors.msg?.message}
                  sx={inputTextStyle}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  size="large"
                  type="submit"
                  sx={{ marginTop: 2, color: '#ffffff' }} // Bright white for button text
                >
                  {isPending ? 'Loading...' : 'Submit'}
                </Button>
              </form>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Index;
