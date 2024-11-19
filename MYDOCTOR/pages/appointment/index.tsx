import React, { useState } from 'react';
import { useAllDoctorList, useGetAllDeptsQuery } from '@/customHooks/cms.query.hooks';
import { Box, Grid2, Autocomplete, TextField, CircularProgress, Typography, Card, CardActions, CardMedia, CardContent, Button, Stack } from '@mui/material';
import Link from 'next/link';

const Index = () => {
    const [searchedDept, setSearchedDept] = useState<string | null>(null);
    const [viewedDoctors, setViewedDoctors] = useState<any[]>([]);
    const [selectedDoctors, setSelectedDoctors] = useState<any[]>([]);
    const { data: doctors, isLoading: isLoadingDoctors } = useAllDoctorList();
    const { data: depts, isLoading: isDeptsLoading } = useGetAllDeptsQuery();
    console.log(doctors?.data);
    function replaceBackslashes(input: string): string {
        return input.replace(/\\/g, '//');
      }
    React.useEffect(() => {
        if (doctors?.data) {
            if (searchedDept) {
                setViewedDoctors(doctors.data.filter((doctor) => doctor.department_id === searchedDept));
            } else {
                setViewedDoctors(doctors.data);
            }
        }
    }, [doctors, searchedDept]);

    if (isLoadingDoctors || isDeptsLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    const handleDeptChange = (event: React.ChangeEvent<{}>, value: any | null) => {
        setSearchedDept(value?._id || null);
    };

    const handleDoctorsView = (event: React.ChangeEvent<{}>, value: any | null) => {
        if (value === null || value === '') {
            setSelectedDoctors(viewedDoctors);
        } else {
            setSelectedDoctors([value]); // Assuming single doctor selection; adjust as needed
        }
    };

    const deptOptions = depts?.data || [];
    const doctorOptions = viewedDoctors;

    return (
        <>
        <Box p={2} m={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', background: 'gray' }}>
            <Typography variant="h6" gutterBottom color="white">Search by Doctor Name or Department</Typography>
            <Grid2 container rowSpacing={2} columnSpacing={2} width="100%">
                <Grid2 size={{xs:12, md:6}}>
                    <Autocomplete
                        sx={{ background: 'white' }}
                        disablePortal
                        options={deptOptions}
                        getOptionLabel={(option) => option.departmentName || ''}
                        renderInput={(params) => (
                            <TextField {...params} label="Department Search" variant="outlined" />
                        )}
                        noOptionsText="No departments available"
                        onChange={handleDeptChange}
                    />
                </Grid2>
                <Grid2 size={{xs:12, md:6}}>
                    <Autocomplete
                        sx={{ background: 'white' }}
                        disablePortal
                        options={doctorOptions}
                        getOptionLabel={(option) => option.name || ''}
                        renderInput={(params) => (
                            <TextField {...params} label="Doctor Search" variant="outlined" />
                        )}
                        noOptionsText="No doctors available"
                        onChange={handleDoctorsView}
                    />
                </Grid2>
            </Grid2>
            
        </Box>
        <Box p={2} m={2} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', background: '#0077b6' }}>
        <Grid2 container width={{ xs: '100%', md: '100%' }} spacing={2}>
                {selectedDoctors.length > 0 ? (
                    selectedDoctors.map((doctor) => (
                        <Grid2 size={{xs:6, md:3}} key={doctor._id}>
                            <Card sx={{ width: '100%' }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={`https://doctor-app-bp0m.onrender.com/${replaceBackslashes(doctor.image)}`} 
                                    title={doctor.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {doctor.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {doctor.department_details[0].departmentName || 'No specialty provided'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Stack alignItems='center' justifyContent='center' width='100%'>
                                    <Button size="small" fullWidth variant='contained' sx={{mb:2, p:1}}>see details</Button>
                                    <Link href={`/appointment/${doctor._id}`} style={{width:'100%'}}><Button size="small" fullWidth variant='contained' sx={{p:1}} color='secondary'>take an appointment</Button></Link>
                                    </Stack>
                                </CardActions>
                            </Card>
                        </Grid2>
                    ))
                ) : (
                    <Typography color="white">No doctors selected</Typography>
                )}
            </Grid2>
            </Box>
        </>
    );
};

export default Index;
