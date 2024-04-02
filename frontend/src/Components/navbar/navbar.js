import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemButton,
  ListItemText,
  Badge
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Notification from '../notifications/Notification';
import NotificationsIcon from '@mui/icons-material/Notifications';

const navItems = [
  { title: "Home", path: "/home" },
  { title: "Contact", path: "/contactus" },
  { title: "FAQs", path: "/faq" },
  { title: "Sign up", path: "/signup"}
];
const drawerWidth = 240;

export default function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openNotificationPopup, setOpenNotificationPopup] = React.useState(false); // State for notification popup
  const [notifications] = React.useState([
      { message: "Notification 1" },
      { message: "Notification 2" },
      { message: "Notification 3" },
      { message: "Notification 4" },
      { message: "Notification 5" },
      { message: "Notification 6" },
      { message: "Notification 7" },
      { message: "Notification 8" },
  ]);

  const [hasNewNotifications, setHasNewNotifications] = React.useState(true);
  const handleNotificationClick = () => {
    setOpenNotificationPopup(true);
    setHasNewNotifications(false); 
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h5" sx={{ my: 2 }}>
        FINtastic
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={item.path}
                >
                  {item.title}
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" style={{ background: "#4c4b42" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            FINtastic
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item.title}>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={item.path}
                >
                  {item.title}
                </Link>
              </Button>
            ))}
          </Box>
          <IconButton
            color="inherit"
            onClick={handleNotificationClick}>
            <Badge color="error" variant="dot" invisible={!hasNewNotifications}>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Notification
              open={openNotificationPopup}
              onClose={() => setOpenNotificationPopup(false)}
              notifications={notifications}
          />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );
}
