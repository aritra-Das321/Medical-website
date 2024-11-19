import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Grid, Card, CardContent, CardActions, Skeleton, Stack} from '@mui/material'
import { useDeptWiseDoctorQuery } from '@/customHooks/cms.query.hooks';
const DepartmentDoctors:React.FC<{ open: boolean; handleClose: () => void; dept: {id:string, name: string} }> = ({ open, handleClose, dept })=> {

    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {xs:'100%',md:'70%'},
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: {xs:1, md:4},
        overflow:'auto'
      };

      const {data:deptDoctors,isLoading}  = useDeptWiseDoctorQuery(dept.id);
      console.log(deptDoctors);
  return (
    <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            {dept.name}
          </Typography>
          {isLoading?(
           <Stack spacing={1}>
           {/* For variant="text", adjust the height via font-size */}
           <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
     
           {/* For other variants, adjust the size with `width` and `height` */}
           <Skeleton variant="rectangular" width={210} height={60} />
           <Skeleton variant="rectangular" width={210} height={60} />
           <Skeleton variant="rectangular" width={210} height={60} />
           <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
         </Stack>
        ):(
        <Grid container spacing={2} mt={2}>
            {deptDoctors?.data.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {item.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <Button onClick={handleClose} sx={{ mt: 2 }}>Close</Button>
        </Box>
        
      </Modal>

  )
}

export default DepartmentDoctors
