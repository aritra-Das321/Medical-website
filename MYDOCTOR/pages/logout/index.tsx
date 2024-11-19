import { Box, Button,Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { logout as logoutOptions } from '@/toolkit/authSlice'; 
import { useRouter } from 'next/router';
const Index = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const handleLogOut = ()=>{
        dispatch(logoutOptions());
        router.push('/');
    }
    const handleStay = ()=>{
        router.push('/');
    }
  return (
    <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', height:'80vh', width:'100vw'}}>
      <Paper elevation={6} sx={{width:'80vw'}}>
        <Stack sx={{p:4}}>
            <Typography variant='h5' gutterBottom m={2}>Are You Sure to Log Out ?</Typography>
            <Stack spacing={2} direction='row'>
                <Button variant='contained' color='primary' sx={{m:2}} onClick={handleLogOut}>Log out</Button>
                <Button variant='contained'color='secondary' sx={{m:2}} onClick={handleStay}>Stay here</Button>
            </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

export default Index
