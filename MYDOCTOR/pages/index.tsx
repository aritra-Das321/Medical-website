import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Carousel from "@/components/carousel/Carousel";
import Head from "next/head";
import { Box, Button, Stack, Grid2, Typography } from "@mui/material";


import DoctorsCompoent from "@/components/doctorsView/DoctorsComponent";
import Departments from "@/components/departments/Departments";
import RecentBlogs from "@/components/recentBlogs/RecentBlogs";
import ScrollingText from "@/components/updates/UpdateLog";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <title>the doctor app</title>
      </Head>
      <div>
        <Carousel />
        
        <Stack spacing={0} direction='row'>
          <ScrollingText />
        </Stack>
        <RecentBlogs />
        <Departments />
      
      
      
      </div>
    </>

  );
}
