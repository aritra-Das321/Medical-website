import { useRecentBlogQuery } from '@/customHooks/cms.query.hooks'
import { Box, Stack, Typography } from '@mui/material'
import Link from 'next/link';
import React from 'react'

const RecentBlogsSingle = () => {
    const { data: recentblogs, isLoading } = useRecentBlogQuery();
    console.log(recentblogs);

    return (
        <Stack p={2} sx={{ background: '#333', borderRadius: '13px' }} spacing={2}>
            <Typography variant='h4' gutterBottom sx={{ color: '#fff' }}>
                RECENT BLOGS
            </Typography>
            {recentblogs?.data.map((item) => (
                <Link href={`/blogs/${item._id}`} key={item._id} passHref>
                    <Typography variant='h6' sx={{ color: '#fff', textDecoration: 'none' }}>
                        {item?.title}
                    </Typography>
                </Link>
            ))}
        </Stack>
    )
}

export default RecentBlogsSingle
