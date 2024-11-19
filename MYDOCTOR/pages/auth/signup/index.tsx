import React, { useState } from 'react';
import { Box, Button, Paper, TextField, Typography, Stack } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/auth.module.css'; 
import {IRegisterResponse} from '@/typescript/auth.interface';
import { useForm } from "react-hook-form";
import { useUserSignUpMutation } from '@/customHooks/auth.query.hooks';

const Index:React.FC = () => {
  const [img, setImg] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterResponse>();

  const { mutate, isPending } = useUserSignUpMutation();

  const onSubmit = (formData: IRegisterResponse) => {
    const formdata = new FormData();
    formdata.append("name", formData.name);
    formdata.append("email", formData.email);
    formdata.append("phone",formData.phone)
    formdata.append("password", formData.password);
    formdata.append("forget", formData.forget);
    if(img)formdata.append("image", img);
    mutate(formdata);
  };
  const [imgPreviewUrl, setImgPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null; 
    if (file) {
      setImg(file);
      setImgPreviewUrl(URL.createObjectURL(file));
    } else {
      setImg(null);
      setImgPreviewUrl(null);
    }
  };

  React.useEffect(() => {
    return () => {
      if (imgPreviewUrl) {
        URL.revokeObjectURL(imgPreviewUrl);
      }
    };
  }, [imgPreviewUrl]);

  return (
    <Box
    sx={{
      p: 2,
      width: '100%',
      height: '100vh',
      backgroundImage: 'url("/images/doctor-6701410_1920.jpg")', // Replace with the path to your background image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeIn 1s ease-out', 
      }}
    >
      <Paper
        elevation={6}
        sx={{
          px: 4,
          py: 3,
          width: { xs: '90vw', lg: '50vw' },
          textAlign: 'center',
          animation:`${styles['fade-up']} 0.5s`
        }}
      >
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register("name", {
                  required: "First name is required",
                })}
                label="Name"
                type="text"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name?.message}
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
                helperText={errors.email && errors.email.message}
              />
              <TextField
                {...register("phone", {
                  required: "phone no is required",
                })}
                label="Phone no"
                type="number"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
              <TextField
                {...register("password", {
                  required: "Password is required",
                })}
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
              />
              <TextField
                {...register("forget", {
                  required: "forget password is required",
                })}
                label="Forget password"
                placeholder='eg. last school name'
                type="text"
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.forget}
                helperText={errors.forget?.message}
              />
              <Stack spacing={2} direction="row">
                <input
                  accept="image/*"
                  id="upload-button"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <label htmlFor="upload-button">
                  <Button variant="contained" component="span" color="primary">
                    Upload
                  </Button>
                </label>
                {imgPreviewUrl ? (
                    <Image
                      src={imgPreviewUrl}
                      alt="Uploaded preview"
                      width={200}
                      height={180}
                      style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <Typography variant="body2" color="textSecondary">
                      Drag or drop content
                    </Typography>
                )}
              </Stack>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                size="large"
                type="submit"
                sx={{ marginTop: 2 }}
              >
                {isPending ? 'Loading...' : 'Sign up'}
              </Button>
            </form>
        
        {/* the hr text */}

        <div className={styles['hr-container']}>
          <span>OR</span>
        </div>
        <Stack spacing={2} direction={"row"} alignItems="center"  justifyContent="center">
            <Typography variant='body1' sx={{color:"gray"}}>Already Have an Account?</Typography>
            <Link href="/auth/signin"><Button variant='contained' color='primary'>Log in</Button></Link>
        </Stack>
      </Paper>
    </Box>
  )
}

export default Index
