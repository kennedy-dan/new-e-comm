import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";

import { getCategories } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { List, ListItem, MenuList } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    ...theme.mixins.toolbar,
  },
  menu: {
    display: "block",
    padding: "40px",
    margin: "60px",
    // position: 'absolute'
  },
  span: {
    display: "block",
    lineHeight: "40px",
    fontSize: "px",
  },
}));

export default function Headers() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setvalue] = useState(0);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [close, setClose] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const category = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleChange = (e, value) => {
    setvalue(value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const menuId = "primary-search-account-menu";
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let cats of categories) {
      // console.log(cats.children.parentId)

      myCategories.push(
        <div>
          <Tab
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup={anchorEl ? "true" : undefined}
            label={
              cats.name ? (
                <a href={`${cats.slug}?cid=${cats._id}&type=${cats.type}`}>
                  {cats.name}
                </a>
              ) : (
                <span className={classes.span}>{cats.name}</span>
              )
            }
            onClick={(event) => handleClick(event)}
          />
          <Menu
            component="nav"
            anchorEl={anchorEl}
            id={menuId}
            value={close}
            keepMounted
            open={isMenuOpen}
            onClose={handleMenuClose}
            className={classes.name}
          >
            {cats.children.length > 0 ? (
              <MenuItem onClick={handleMenuClose}>
                {renderCategories(cats.children)}
              </MenuItem>
            ) : null}
          </Menu>
        </div>
      );
    }
    <div></div>;
    return myCategories;
  };

  return (
    <React.Fragment>
      <div className={classes.grow}>
        <AppBar position="sticky">
          <Toolbar>
            <Tabs value={value} onChange={handleChange}>
              {category.categories.length > 0
                ? renderCategories(category.categories)
                : null}
            </Tabs>
            <div className={classes.grow} />
          </Toolbar>
        </AppBar>
      </div>
    </React.Fragment>
  );
}
