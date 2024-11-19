import { Box, Button, Grid2, Skeleton, Stack, Typography } from '@mui/material'; // Use Grid2 directly from MUI
import React from 'react';
import Image from 'next/image';
import { useAllBlogQuery } from '@/customHooks/cms.query.hooks';
import Link from 'next/link';

const RecentBlogs: React.FC = () => {
  const { data: blogs, isLoading } = useAllBlogQuery();

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
    return `${formattedTime}, ${day}${getDaySuffix(day)} ${dayOfMonth} ${year}`;
  }

  function replaceBackslashes(input: string): string {
    return input.replace(/\\/g, '//');
  }

  return (
    <Box
      sx={{
        py: 2,
        my: 2,
        borderRadius: '13px',
        animation: 'colorChange 10s infinite',
        background: 'linear-gradient(45deg, #82B3D9, #A35BDC)',
        '@keyframes colorChange': {
          '0%': { background: '#82B3D9' },
          '25%': { background: '#A35BDC' },
          '50%': { background: '#FF82B3' },
          '75%': { background: '#FFA35B' },
          '100%': { background: '#82B3D9' },
        },
      }}
      mx={{ xs: 0, md: 2 }}
    >
      <Typography
        variant='h4'
        m={4}
        sx={{ fontWeight: 'bolder', color: 'black', textAlign: 'center' }}
      >
        BLOGS
      </Typography>
      {isLoading ? (
        <Grid2 container width='100%' spacing={1}>
          <Grid2 size={{ xs: 12 }} m={20}>
            <Skeleton height='300px' />
            <Skeleton height='300px' />
            <Skeleton height='300px' />
          </Grid2>
        </Grid2>
      ) : (
        <Grid2 container width='100%' rowSpacing={2}>
          {blogs?.data.map((item) => (
            <Grid2
              size={{ xs: 12 }}
              mx={2}
              key={item._id}
              sx={{ transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.02)' } }}
            >
              <figure className="md:flex bg-gray-900 text-white rounded-xl p-8 md:p-0 border-2 border-gray-700">
                <div className="md:w-1/2 md:order-2">
                  <Image
                    className="w-full h-auto md:h-64 md:rounded-xl rounded-xl"
                    src={`https://doctor-app-bp0m.onrender.com/${replaceBackslashes(item.image)}`}
                    alt={item.title}
                    width="904"
                    height="720"
                  />
                </div>
                <div className="md:w-1/2 md:order-1 pt-6 md:p-8 text-center md:text-left space-y-4">
                  <blockquote>
                    <p className="text-lg font-medium text-blue-400">“{item.title}”</p>
                  </blockquote>
                  <figcaption className="font-medium">
                    <div className="text-blue-300 mb-2">
                      {formatDateTime(item.createdAt)}
                    </div>
                    <div className="text-gray-300">
                      {item.description}
                    </div>
                  </figcaption>
                  <Stack
                    direction='row'
                    spacing={2}
                    justifyContent={{ xs: 'center', md: 'start' }}
                    alignItems='center'
                  >
                    <Link href={`/blogs/${item._id}`}>
                      <Button variant="contained" color="primary">Know more</Button>
                    </Link>
                  </Stack>
                </div>
              </figure>
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
};

export default RecentBlogs;
