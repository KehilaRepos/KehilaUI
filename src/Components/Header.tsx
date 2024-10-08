import * as React from 'react';
import { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import logoImage from '../assets/images/logo.png';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Login from './Login';
import { Button, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

/** TODO: Maybe seperate the header component to 3 smaller components:
 * 
 * Menu
 * Logo
 * Member Area
 * 
 * Attention -- We should do it only if we find these three parts useful in other parts in the website.
 */

interface Props {
  
}

function Header ({}: Props) {

  const pages = {
    'Home': '/',
    'Explore': '/explore',
    'Create Post': '/create-post',
    'About Us': '/about-us'
  };

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (

    <AppBar position="static" sx= { { bgcolor: "#222831" } }>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box
          component="img"
          src={logoImage}
          alt="Kehila Logo"
          sx={{
            display: { xs: 'none', md: 'flex' },
            mr: 1,
            pt: 2,
            pb: 2,
            height: 'auto',
            width: '150px'
          }}
        />

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {
                Object.entries(pages).map(([page, slug]) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link to={slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Typography textAlign="center">{page}</Typography>
                    </Link>
                  </MenuItem>
                ))
              }
            </Menu>
          </Box>
          {/* <NoteAltOutlinedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            KEHILA
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, pl: 7 }}>
          {
            Object.entries(pages).map(([page, slug]) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2, 
                  color: 'white', 
                  display: 'block', 
                  '&:hover': {
                    color: '#b78fd6',
                    cursor: 'pointer'
                  },
                  pl: 4
                }}
              >
                <Link to={slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {page}
                </Link>
              </Button>
            ))
          }
          </Box>

          <Box sx={{display: 'flex'}}>

              <Login />

              <Typography sx={{pl: 3}}>
                <NotificationsNoneIcon sx={{
                  height: 'auto',
                  width: 35,
                  '&:hover': {
                    color: '#b78fd6',
                    cursor: 'pointer'
                  },
                  }} />
              </Typography>

          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;