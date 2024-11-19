import { useUserDashboardQuery } from '@/customHooks/cms.query.hooks';
import { Box, Typography, Grid2 } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import {Cookies} from 'react-cookie';
const Index = () => {
    const cookies = new Cookies();
    const userId = cookies.get("userId");
    const {data:appointmentsCreated, isLoading:isAppointmentsLoading} = useUserDashboardQuery(userId? userId : "");
    console.log(appointmentsCreated);
    function formatDateTime(dateTimeString: string): string {
        const date = new Date(dateTimeString); 
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        };
        const dateFormatter = new Intl.DateTimeFormat('en-US', options);
        const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        const formattedDate = dateFormatter.format(date);
        const formattedTime = timeFormatter.format(date);
        const getDaySuffix = (day: number): string => {
          if (day > 3 && day < 21) return 'th'; 
          switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
          }
        };
        const day = date.getDate();
        const [weekday, dayOfMonth, month, year] = formattedDate.split(' ');
        return `${formattedTime}  ,${day}${getDaySuffix(day)} ${dayOfMonth} ${year}`;
      }
    if(isAppointmentsLoading){
        return( <></>)
    }
    
      function replaceBackslashes(input: string): string {
        return input.replace(/\\/g, '//');
      }
  return (
    <Box sx={{borderRadius:'13px', p:{xs:1, md:2}, m:{xs:0, md:2}, background:'#dcdcdc'}}>
      <Typography variant='h4' gutterBottom m={2}>Your Appointments</Typography>
      <Grid2 container width='100%' rowSpacing={2}>
      {
        appointmentsCreated?.data.map((item)=>{
          return(
            <Grid2 size={{xs:12}} mx={2} key={item._id} sx={{transition: 'transform 0.3s ease-in-out','&:hover':{transform: 'scale(1.02)'}}}>
        <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 justify-normal border-2">
            <Image className="w-34 h-34 md:w-auto md:h-64 md:rounded-xl rounded-xl  order-first" src={`https://doctor-app-bp0m.onrender.com/${replaceBackslashes(item.doctor_id.image)}`} alt="" width="904" height="720"/>
            <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
              <blockquote>
                <p className="text-xl font-mono tracking-wide font-large text-cyan-600">
                    {item.doctor_id.name}
                </p>
              </blockquote>
              <figcaption className="font-medium">
                <div className="text-dark-500 dark:text-dark-400 mb-2">
                  {item.department_id.departmentName}
                </div>
                <div className="text-slate-700 dark:text-slate-500 mb-2">
                  {formatDateTime(item.createdAt)}
                </div>
                <div className={`${item.isPending?"text-rose-500": "text-green-400"}`}>
                  {item.isPending? "NOT APPROVED YET": "APPROVED"}
                </div>
                <div className="text-slate-700 dark:text-slate-500 mb-2">
                  Message: {item.message}
                </div>
                <div className="text-zinc-400 dark:text-slate-500 line-clamp-2">
                  Doctor Description: {item.doctor_id.description}
                </div>
              </figcaption>
            </div>
          </figure>
        </Grid2>
          )
        })
      }
    </Grid2>
    </Box>
  )
}

export default Index
