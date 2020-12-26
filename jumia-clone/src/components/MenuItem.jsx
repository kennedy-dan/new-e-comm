import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ListItemText from "@material-ui/core/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { getCategories } from "../actions";
import Tab from "@material-ui/core/Tab";
import Menu from "@material-ui/core/Menu";
import Tabs from "@material-ui/core/Tabs";
const useStyles = makeStyles((theme) => ({
  menuHeader: {
    maxWidth: "100%",
    height: "60px",
    backgroundColor: theme.palette.common.orange,
    listStyle: "none",
    marginTop: 70,
    padding: 0,
    ...theme.mixins.toolbar,
  },
  menuList: {
    listStyle: "none",
    maxWidth: "10%",
    maxHeight: "10%",

    margin: 0,
    // margin: '50px',
    display: "flex",
    position: "relative",
    backgroundColor: "red",
  },
  offset: { ...theme.mixins.toolbar, marginTop: 64, height: -100 },
  listItem: {
    margin: 0,
    padding: 1,
  },
  listitemtext: {
    // backgroundColor: 'blue',
    // left: 0,
    // position: 'absolute',
    // right: 0
    // display: 'none',
    "$:hover": {
      display: "block",
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  tf: {
    backgroundColor: "pink",
  },
}));

const MenuItem = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setvalue] = useState(0);
  const category = useSelector((state) => state.category);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCategories());
  // }, []);

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  const handleChange = (e, value) => {
    setvalue(value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // const handleMouse = (event) => {
  //   setAnchorEl(event.currentTarget);
  //   setOpen(true);
  // };

  // const handleClose = (e) => {
  //   setAnchorEl(null);
  //   setOpen(false);
  // };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const renderCategories = (categories) => {
    let myCategories = [];

    for (let cats of categories) {
      myCategories.push(
        <div>
          <Tabs value={value} onChange={handleChange}>
            <Tab
              aria-owns="simple"
              aria-haspopup="true"
              label={cats.name}
              onClick={handleClick}
            />
          </Tabs>

          <Menu
            id="simple"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>{cats._id}</MenuItem>
          </Menu>

          {/* <ListItem button onClick={handleClick} >
            <ListItemText
            className={classes.tf}
            onMouseOver={handleMouse}
              primary={
                cats.parentId ? (
                  <a href={cats.slug}>{cats.name}</a>
                ) : (
                  <span>{cats.name}</span>
                )
              }
            />
          </ListItem>
          {cats.children.length > 0 ? (
            <ListItem className={classes.nested} className={classes.listItem}>
            <ListItemText primary={renderCategories(cats.children)} className={classes.listitemtext} />
            </ListItem>
          ) : null} */}
        </div>
      );
    }
    return myCategories;
  };
  // const menuId = 'primary-search-account-menu';

  return (
    <React.Fragment>
      <div className={classes.offset}>
        <AppBar position="sticky">
          <Toolbar>
            <Tabs value={value} onChange={handleChange}>
              <Tab
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup={anchorEl ? "true" : undefined}
                label="you"
                onClick={(event) => handleClick(event)}
              />
            </Tabs>
            <Menu
              id={menuId}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>me</MenuItem>
            </Menu>
            {/* <Toolbar>
          {category.categories.length > 0
            ? renderCategories(category.categories)
            : null}
        </Toolbar> */}
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
    </React.Fragment>
  );
};

export default MenuItem;
