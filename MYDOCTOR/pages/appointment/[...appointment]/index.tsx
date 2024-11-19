import { useCreateAppoitmentMutation, useDoctorDetailsQuery } from '@/customHooks/cms.query.hooks';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import {Grid2, Typography,Paper, Button, TextField, Box, Stack, Skeleton} from'@mui/material';
import styles from '@/styles/auth.module.css'; 
import { useForm } from 'react-hook-form';
import { Cookies } from 'react-cookie';
import CustomAlert from '@/ui/customAlert/CustomAlert';

interface inputData{
    phone:string;
    message:string;
}
const Index = () => {
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
    const handleCloseSnackbar = () => setOpenSnackBar(false);
    const handleOpenSnackbar = () => setOpenSnackBar(true);
    const cookies = new Cookies();
    const router = useRouter();
    const {appointment}  = router.query;
    const doctorId = appointment? appointment?.[0] : '';
    const { register, handleSubmit, formState: { errors } } = useForm<inputData>();
    const {isPending, mutate, isError} = useCreateAppoitmentMutation();
    const {data:singleDoctor, isLoading:isDoctorLoading} = useDoctorDetailsQuery(doctorId);
    const onSubmit = (formData:inputData)=>{
    const userId = cookies.get('userId');
    if (!userId) {
      handleOpenSnackbar();
    } else {
      if(!isDoctorLoading){
        const uploadData = new URLSearchParams();
        uploadData.append("user_id",userId);
        uploadData.append("department_id",singleDoctor?.data.department_id._id ? singleDoctor?.data.department_id._id : '');
        uploadData.append("doctor_id",doctorId);
        uploadData.append("phone",formData.phone);
        uploadData.append("message",formData.message);
        mutate(uploadData.toString());
      }
    }
        
    }
    console.log(singleDoctor);
    if(isDoctorLoading){
        return(
        <Grid2 container rowSpacing={2} columnSpacing={2} width="100%" p={2}>
          <Grid2 size={{xs:12, md:6}} sx={{ display: 'flex', flexDirection: 'column', p: 2, background: '#d4d4d4', borderRadius: '13px' }}>
          <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
          </Grid2>
          <Grid2 size={{xs:12, md:6}} >
          <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
            </Box>
          </Grid2>
        </Grid2>)
    }
  return (
    <Box>
    <Grid2 container rowSpacing={2} columnSpacing={2} width="100%" p={2}>
        <Grid2 size={{xs:12, md:6}} sx={{ display: 'flex', flexDirection: 'column', p: 2, background: '#d4d4d4', borderRadius: '13px' }}>
          <Image
            src={`https://doctor-app-bp0m.onrender.com/${singleDoctor?.data?.image || ''}`}
            alt="Doctor"
            width={400}
            height={400}
            className="w-34 h-34 md:w-64 md:h-64 md:rounded-xl rounded-xl  order-first"
          />
          <Typography gutterBottom variant="h4" color='primary'>
            {singleDoctor?.data.name || ''}
          </Typography>
          <Typography gutterBottom variant="h6">
            Department Name: {singleDoctor?.data.department_id.departmentName || ""}
          </Typography>
          <Typography gutterBottom variant="body1">
            Aparture Time: {singleDoctor?.data.aperture_time || ""}
          </Typography>
          <Typography gutterBottom variant="body1">
            Departure Time: {singleDoctor?.data.departure_time || ""}
          </Typography>
          <Typography gutterBottom variant="body2">
            Description: {singleDoctor?.data.description || ''}
          </Typography>
        </Grid2>
        <Grid2 size={{xs:12, md:6}} >
        <Paper
        elevation={6}
        sx={{
          px: 2,
          py: 3,
          width:"100%",
          textAlign: 'center',
          animation:`${styles['fade-up']} 0.5s`
        }}
      >
        <Typography variant="h5" gutterBottom>
          Application Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("phone", {
              required: "Phone is required",
            })}
            label="Phone No"
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.phone}
            helperText={errors.phone && errors.phone?.message}
          />
          <TextField
            {...register("message", {
              required: "Message is Required",
            })}
            label="Message"
            type="text"
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.message}
            helperText={errors.message && errors.message.message}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            type="submit"
            sx={{ marginTop: 2 }}
          >
            {isPending ? 'Loading...' : 'Submit'}
          </Button>
        </form>
      </Paper>
        </Grid2>
      </Grid2>
      {openSnackBar && (
        <CustomAlert
          message="You need to log in first"
          severity="error"
          open={openSnackBar}
          onClose={handleCloseSnackbar}
        />
      )}
      </Box>
  )
}

export default Index
