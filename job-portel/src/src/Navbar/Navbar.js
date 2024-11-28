import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Use Redux hooks
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from '../redux/authSlice'; // Import the logout action

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.user?.role); // Get user role from Redux

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    window.location.href = '/'; // Redirect to login page
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems =
    userRole === 'admin'
      ? [
          { label: 'Add Job', path: '/admin/add-job' },
          { label: 'Users', path: '/admin/employees' },
        ]
      : [
          { label: 'Home', path: '/home' },
          { label: 'About', path: '/about' },
          { label: 'Job Listings', path: '/job-listings' },
          { label: 'Contact', path: '/contact' },
          { label: 'Company Showcase', path: '/company-showcase' },
        ];

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Job Portal
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {navItems.map((item) => (
            <Button key={item.label} color="inherit" component={Link} to={item.path}>
              {item.label}
            </Button>
          ))}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ display: { xs: 'block', sm: 'none' } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            {navItems.map((item) => (
              <ListItem button key={item.label} component={Link} to={item.path}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
