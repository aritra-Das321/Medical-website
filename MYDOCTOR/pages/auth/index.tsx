
import React from 'react';
import { Box, Button, Paper, TextField, Typography, Stack } from '@mui/material';
import styles from '@/styles/auth.module.css'; 
import { useForm } from 'react-hook-form';
import { useSignInMutation } from '@/customHooks/auth.query.hooks';
import Link from 'next/link';


interface FormData {
  email: string;
  password: string;
}

const Index: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const { mutate, isPending } = useSignInMutation();

  const onSubmit = (formData: FormData) => {
    const data = new URLSearchParams();
    data.append('email', formData.email);
    data.append('password', formData.password);
    mutate(data.toString());
  };

  return (
    <Box
      sx={{
        p: 2,
        width: '100%',
        background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        
      }}
    >
      <Paper
        elevation={6}
        sx={{
          px: 2,
          py: 3,
          width: { xs: '90vw', lg: '50vw' },
          textAlign: 'center',
          animation:`${styles['fade-up']} 1s`
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            type="submit"
            sx={{ marginTop: 2 }}
          >
            {isPending ? 'Loading...' : 'Log In'}
          </Button>
        </form>
        
        {/* the hr text */}

        <div className={styles['hr-container']}>
          <span>OR</span>
        </div>
        <Stack spacing={2} direction={"row"} alignItems="center"  justifyContent="center">
            <Typography variant='body1' sx={{color:"gray"}}>New customer?</Typography>
            <Link href="/auth/signup"><Button variant='contained' color='secondary'>Sign up</Button></Link>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Index;
