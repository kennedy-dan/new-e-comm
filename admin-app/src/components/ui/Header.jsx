import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Tab from "@material-ui/core/Tab";
import ShopIcon from "@material-ui/icons/Shop";
import CategoryIcon from "@material-ui/icons/Category";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "fixed",
    ...theme.mixins.toolbar,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    dispatch(signout());
  };
  const routes = [
    { name: "Signin", link: "/signin" },
    { name: "Signup", link: "/signup" },
  ];
  const loggedoutroute = [
    { name: "Signout" },
 
  ];

  const adminlogRoute = [
    { list: "product", link: "/products" },
    { list: "order", link: "/order" },
    { list: "category", link: "/category" },
    { list: "Page", link: "/page" },


  ];

  const loggedIn = () =>
    loggedoutroute.map((text, index) => (
      <ListItem button key={text.name} onClick={logout}>
        {/* <Typography>hoiuioujo9</Typography> */}
        <ListItemIcon>
          {index % 2 === 0 ? <AccountCircleIcon /> : <AccountCircleIcon />}
        </ListItemIcon>
        <ListItemText primary={text.name} />
      </ListItem>
    ));
  const loggedOut = () =>
    routes.map((text, index) => (
      <ListItem button key={text.name} component={Link} to={text.link}>
        {/* <Typography>hoiuioujo9</Typography> */}
        <ListItemIcon>
          {index % 2 === 0 ? <AccountCircleIcon /> : <AccountCircleIcon />}
        </ListItemIcon>
        <ListItemText primary={text.name} />
      </ListItem>
    ));

  const adminLog = () =>
      adminlogRoute.map((text, index) => (
      <ListItem button key={text.list} component={Link} to={text.link}>
        {/* <Typography>hoiuioujo9</Typography> */}
        <ListItemIcon>
          {index % 2 === 0 ? <AccountCircleIcon /> : <AccountCircleIcon />}
        </ListItemIcon>
        <ListItemText primary={text.list} />
      </ListItem>
    ));

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <Typography>Welcome Kennedy</Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List onClick={handleDrawerClose}>{auth.authenticate ? loggedIn() : loggedOut()}</List>
          <Divider />
          <List onClick={handleDrawerClose}>{auth.authenticate ? adminLog() : ""}</List>
        </Drawer>
      </div>
    </React.Fragment>
  );
}
