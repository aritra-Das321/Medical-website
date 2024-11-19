import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Toolbar } from '@mui/material';

const pages = [
  { page: 'Home', path: '/' },
  { page: 'Doctors', path: '/doctors' },
  { page: 'Blogs', path: '/blogs' },
  { page: 'Departments', path: '/departments' },
  { page: 'Contact Us', path: '/contact' },
  { page: 'Appointments', path: '/appointment' },
];

const settings = [
  
  { page: 'Booking', path: '/dashboard' },
  { page: 'Log Out', path: '/logout' },
];

function Header() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  const { isLoggedIn, userImage } = useSelector(
    (state: any) => state.auth || { isLoggedIn: false, userImage: '' }
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleMobileMenu = (newOpen: boolean) => () => {
    setMobileMenu(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {pages.map((page) => (
          <ListItem key={page.page} disablePadding component="div" onClick={() => setMobileMenu(false)}>
            <Link href={page.path} style={{ textDecoration: 'none', color: 'black', width: '100%' }}>
              <ListItemButton>
                <ListItemText primary={page.page.toUpperCase()} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ background: '#333333', boxShadow: 'none', width: '100%' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h4"
              noWrap
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Arial, sans-serif',
                fontWeight: 900,
                letterSpacing: '.1rem',
                color: '#00ffff',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                textTransform: 'uppercase',
                marginRight: 5, // Add margin to separate from the menu items
              }}
            >
              DocLab
            </Typography>
          </Link>

          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-start' }}>
            {pages.map((page) => (
              <Link key={page.page} href={page.path}>
                <Button
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    fontWeight: 'normal',
                    transition: '0.3s',
                    boxShadow: 'none',
                    '&:hover': {
                      fontWeight: 'bold',
                      color: '#8422D3',
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                    },
                  }}
                >
                  {page.page}
                </Button>
              </Link>
            ))}
          </Box>

          
          <Box sx={{ display: { xs: 'flex', md: 'none' }, marginRight: 2 }}>
            <IconButton size="large" aria-label="menu" onClick={toggleMobileMenu(true)} color="inherit">
              <MenuIcon />
            </IconButton>
            <Drawer open={mobileMenu} onClose={toggleMobileMenu(false)}>
              {DrawerList}
            </Drawer>
          </Box>

         
          {isClient && isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" src={userImage || '/static/images/avatar/2.jpg'} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem onClick={handleCloseUserMenu} key={setting.page}>
                    <Link href={setting.path}>
                      <Button sx={{ textAlign: 'center' }}>{setting.page}</Button>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, display: 'flex' }}>
              <Link href="/auth/signin">
                <Button
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    fontWeight: 'normal',
                    '&:hover': { fontWeight: 'bold', color: 'yellow' },
                  }}
                >
                  LOGIN
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button
                  sx={{
                    my: 2,
                    color: 'white',
                    display: { xs: 'none', md: 'block' },
                    fontWeight: 'normal',
                    '&:hover': { fontWeight: 'bold', color: 'red' },
                  }}
                >
                  REGISTER
                </Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
