// @ts-nocheck
import * as React from 'react';
import { useEffect, useState } from 'react'
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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Login from './Login';
import { Avatar, Badge, Button, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, MenuItem, Modal, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { utilsService } from '../Services/utilService';
import LoginService from '../Services/loginService';
import EmailIcon from '@mui/icons-material/Email';
import ErrorIcon from '@mui/icons-material/Error';

interface Props {
  
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: 300,
  maxWidth: '100%',
  overflow: 'scroll',
  bgcolor: 'background.paper',
  boxShadow: 24,
  paddingLeft: 6,
  paddingTop: 0,
  paddingRight: 6,
};

function Header ({}: Props) {

  const pages = {
    'Home': '/',
    'Explore': '/explore',
    'Create Post': '/create-post',
    'About Us': '/about-us'
  };

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [openNotification, setOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unviewedNotifications, setUnviewedNotifications] = useState(0);

  useEffect(() => {
    if(LoginService.getLoggedInUserEmail() === undefined || LoginService.getLoggedInUserEmail() === "") {
      return;
    }
    const {request} = utilsService.getNotifications(LoginService.getLoggedInUserEmail());
    request.then(res => {
      console.log(res.data.data);

      let count = 0;
      res.data.data.forEach((notification: any) => {
        if(notification.is_read === false) {
          count++;
        }
      });

      setUnviewedNotifications(count);
      setNotifications(res.data.data);

    });
  }, [openNotification]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  return (
    <>
    <AppBar position="static" sx= { { bgcolor: "#222831" } }>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box
            component="img"
            src={logoImage}
            alt="Kehila Logo"
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1,
              pt: 4,
              pb: 4,
              height: 'auto',
              width: '250px'
            }}
          />
        </Link>
        
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
              <Link to={slug} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                    {page}
                </Button>
              </Link>

            ))
          }
          </Box>

          <Box sx={{display: 'flex', position: 'relative'}}>

              <Login />

              <Typography sx={{pl: 3 }} >
                <Badge badgeContent={LoginService.getLoggedInUserEmail() !== undefined && LoginService.getLoggedInUserEmail() !== "" ? unviewedNotifications : 0} color="error">
                  <NotificationsNoneIcon sx={{
                    height: 'auto',
                    width: 35,
                    '&:hover': {
                      color: '#b78fd6',
                      cursor: 'pointer'
                    },
                    }} onClick={() => setOpenNotification(!openNotification)}
                    />
                </Badge>
              </Typography>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>

    <Modal
      open={openNotification}
      onClose={() => setOpenNotification(!openNotification)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Demo>
          <List dense={false}>
            {
              LoginService.getLoggedInUserEmail() !== undefined && LoginService.getLoggedInUserEmail() !== "" ?
              notifications.map((notification: any) => (
                <>
                <ListItemButton key={notification.nid} sx={{}} onClick={() => utilsService.readNotifications(notification.nid)}>
                  <ListItemAvatar>
                    <Avatar>
                    {
                      notification.type === "1" ? <NotificationsNoneIcon /> :
                      notification.type === "2" ? <ThumbUpIcon /> :
                      notification.type === "3" ? <EmailIcon /> :
                      <ErrorIcon />
                    }
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                    <span>
                        Someone 
                        {notification.type === '1' ? ' viewed ' : 
                        notification.type === '2' ? ' liked ' : 
                        notification.type === '3' ? ' registered as a volunteer for one of your posts' : 
                        ' interacted with '}  {}
                        {notification.type !== '3' &&  
                        <Link onClick={() => setOpenNotification(!openNotification)} 
                              to={`/post/${notification.pid}`} 
                              style={{ textDecoration: 'none' }}>
                            your post
                        </Link>}
                    </span>                    
                    }
                  />
                </ListItemButton>
                <Divider />
                </>
              ))
              :
              <ListItem>
                <ListItemText primary="Please login to see your notifications" />
              </ListItem>

            }
          </List>
        </Demo>
      </Box>
    </Modal>

    </>
    
  );
}
export default Header;