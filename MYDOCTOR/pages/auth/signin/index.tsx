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
      height: '100vh',
      backgroundImage: 'url("/images/pexels-negativespace-48603.jpg")', // Replace with the path to your background image
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
          px: 3, 
          py: 4, 
          width: { xs: '90vw', lg: '40vw' }, 
          textAlign: 'center', 
          background: '#fff', 
          borderRadius: 2,
          animation: `${styles['slide-up']} 0.5s ease-out`, // Animation for sliding up the paper
        }} 
      > 
        <Typography variant="h5" gutterBottom sx={{ color: '#333' }}> 
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
            sx={{ 
              backgroundColor: '#f9f9f9',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#dcdcdc', // Border color of the text field
                },
                '&:hover fieldset': {
                  borderColor: '#ff6f61', // Border color on hover
                },
              },
            }} 
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
            sx={{ 
              backgroundColor: '#f9f9f9',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#dcdcdc',
                },
                '&:hover fieldset': {
                  borderColor: '#ff6f61',
                },
              },
            }} 
          /> 
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            size="large" 
            type="submit" 
            sx={{ 
              marginTop: 2, 
              backgroundColor: '#ff6f61',
              '&:hover': {
                backgroundColor: '#e64a19', // Darker color on hover
              }
            }} 
          > 
            {isPending ? 'Loading...' : 'Log In'} 
          </Button> 
        </form> 

        <div className={styles['hr-container']}> 
          <span>OR</span> 
        </div> 
        
        <Stack spacing={2} direction={"row"} alignItems="center" justifyContent="center"> 
          <Typography variant='body1' sx={{ color: "#666" }}>Create New Account?</Typography> 
          <Link href="/auth/signup"><Button variant='contained' color='secondary'>Sign up</Button></Link> 
        </Stack> 
      </Paper> 
    </Box> 
  ); 
}; 

export default Index;
