import React, { useEffect, useState } from 'react'; 
import { useRouter } from 'next/router'; 
import { Cookies } from 'react-cookie'; 
import { 
  Box, 
  Grid, 
  IconButton, 
  Stack, 
  Typography, 
  List, 
  ListItem, 
  Drawer, 
  TextField, 
  Button, 
  Skeleton 
} from '@mui/material'; 
import Image from 'next/image'; 
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'; 
import SendIcon from '@mui/icons-material/Send'; 
import RecentBlogsSingle from '@/components/singleblogRecent/RecentBlogsSingle'; 
import CustomAlert from '@/ui/customAlert/CustomAlert'; 
import { 
  useCreateCommentMutation, 
  useGetSingleBlogComments, 
  useGetSingleBlogQuery 
} from '@/customHooks/cms.query.hooks'; 

const Index: React.FC = () => { 
  const [open, setOpen] = useState<boolean>(false); 
  const [comment, setComment] = useState<string>(''); 
  const [openSnackBar, setOpenSnackBar] = useState<boolean>(false); 

  const handleCloseSnackbar = () => setOpenSnackBar(false); 
  const handleOpenSnackbar = () => setOpenSnackBar(true); 

  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen); 

  const router = useRouter(); 
  const { blogs } = router.query; 
  const blogId = blogs?.[0]; 

  const cookies = new Cookies(); 
  const { data: blogComments, isLoading: commentsLoading } = useGetSingleBlogComments(blogId || ''); 
  const { data: blogData, isLoading: blogLoading } = useGetSingleBlogQuery(blogId || ''); 
  const { mutate, isPending } = useCreateCommentMutation(); 

  const formatDateTime = (dateTimeString: string): string => { 
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
    const formattedDate = dateFormatter.format(date); 
    const [weekday, dayOfMonth, month, year] = formattedDate.split(' '); 
    return `${weekday}, ${dayOfMonth} ${month} ${year}`; 
  }; 

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setComment(e.target.value); 
  }; 

  const onSubmitfc = () => { 
    const userId = cookies.get('userId'); 
    if (!userId) { 
      handleOpenSnackbar(); 
    } else { 
      const formdata = new URLSearchParams(); 
      formdata.append('blog_Id', blogId || ''); 
      formdata.append('user_id', userId); 
      formdata.append('comment', comment); 
      mutate(formdata.toString()); 
      setComment(''); 
    } 
  }; 

  if (commentsLoading || blogLoading) { 
    return ( 
      <Grid container rowSpacing={2} columnSpacing={2} width="100%" p={2}> 
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', p: 2, background: '#333', borderRadius: '13px' }}> 
          <Stack spacing={1}> 
            <Skeleton variant="text" sx={{ fontSize: '1rem', bgcolor: '#444' }} /> 
            <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: '#444' }} /> 
            <Skeleton variant="rectangular" width={210} height={60} sx={{ bgcolor: '#444' }} /> 
            <Skeleton variant="rounded" width={210} height={60} sx={{ bgcolor: '#444' }} /> 
          </Stack> 
        </Grid> 
        <Grid item xs={12} md={6}> 
          <Box sx={{ pt: 0.5 }}> 
            <Skeleton sx={{ bgcolor: '#444' }} /> 
            <Skeleton width="60%" sx={{ bgcolor: '#444' }} /> 
            <Skeleton width="60%" sx={{ bgcolor: '#444' }} /> 
            <Skeleton width="60%" sx={{ bgcolor: '#444' }} /> 
            <Skeleton width="60%" sx={{ bgcolor: '#444' }} /> 
          </Box> 
        </Grid> 
      </Grid> 
    ); 
  } 

  const DrawerContent = ( 
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#1e1e1e' }}> 
      <Box sx={{ flex: 1, overflowY: 'auto', padding: 2 }}> 
        <Typography variant="h5" gutterBottom color="white"> 
          {blogComments?.count === 0 ? 'No Comments Yet' : `${blogComments?.count} Comments`} 
        </Typography> 
        <List> 
          {blogComments?.data.map((item) => ( 
            <ListItem 
              key={item._id} 
              sx={{ 
                p: 2, 
                m: 2, 
                borderRadius: '13px', 
                background: '#333', 
                width: '90%', 
              }} 
            > 
              <Stack> 
                <Stack direction="row"> 
                  <Typography variant="h6" color="white"> 
                    {item.user_id?.name || 'Unknown User'} 
                  </Typography> 
                </Stack> 
                <Typography variant="body1" color="gray"> 
                  {item.comment || 'No Comment'} 
                </Typography> 
              </Stack> 
            </ListItem> 
          ))} 
        </List> 
      </Box> 
      <Box sx={{ padding: 2, backgroundColor: '#2c2c2c' }}> 
        <Stack direction="row" spacing={2} alignItems="flex-end"> 
          <TextField 
            label="Add a comment" 
            variant="outlined" 
            multiline 
            fullWidth 
            value={comment} 
            onChange={handleChangeMessage} 
            sx={{ bgcolor: '#444', color: 'white' }} 
          /> 
          <Button variant="contained" sx={{ px: 2, bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }} onClick={onSubmitfc}> 
            <SendIcon /> 
          </Button> 
          <Button variant="outlined" onClick={toggleDrawer(false)} sx={{ borderColor: '#1976d2', color: '#1976d2' }}> 
            Cancel 
          </Button> 
        </Stack> 
      </Box> 
    </Box> 
  ); 

  return ( 
    <Box sx={{ backgroundColor: '#121212', color: 'white' }}> 
      <Grid container rowSpacing={2} columnSpacing={2} width="100%" p={2}> 
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', p: 2, background: '#1e1e1e', borderRadius: '13px' }}> 
          <Image 
            src={`https://doctor-app-bp0m.onrender.com/${blogData?.data?.image || ''}`} 
            alt="Blog Image" 
            width={904} 
            height={720} 
          /> 
          <Typography gutterBottom variant="h4" color="white"> 
            {blogData?.data.title} 
          </Typography> 
          <Typography gutterBottom variant="body1" color="gray"> 
            {formatDateTime(blogData?.data.createdAt || '')} 
          </Typography> 
          <Typography gutterBottom variant="h6"> 
            {blogData?.data.description} 
          </Typography> 
          <Stack direction="row" spacing={2}> 
            <Typography gutterBottom variant="h6" color="white"> 
              {blogComments?.count === 0 ? 'No Comments Yet' : `${blogComments?.count} Comments`} 
            </Typography> 
            <IconButton onClick={() => setOpen(true)}> 
              <ChatBubbleOutlineIcon sx={{ color: 'white' }} /> 
            </IconButton> 
          </Stack> 
        </Grid> 
        <Grid item xs={12} md={6}> 
          <RecentBlogsSingle /> 
        </Grid> 
      </Grid> 
      <Drawer 
        anchor="bottom" 
        open={open} 
        onClose={toggleDrawer(false)} 
        PaperProps={{ sx: { height: '50%', maxHeight: '80%', overflow: 'hidden', backgroundColor: '#1e1e1e' } }} 
      > 
        {DrawerContent} 
      </Drawer> 
      {openSnackBar && ( 
        <CustomAlert 
          message="You need to log in first" 
          severity="error" 
          open={openSnackBar} 
          onClose={handleCloseSnackbar} 
        /> 
      )} 
    </Box> 
  ); 
}; 

export default Index;
