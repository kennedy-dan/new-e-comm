import React, { useEffect, useState } from "react";

import { Card, Grid } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

import { addToCart, getCartItems } from "../actions";
import PriceDetails from "./ui/PriceDetails";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Cart = (props) => {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // const cartItems = cart.cartItems;
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);
  const bull = <span className={classes.bullet}>•</span>;

  const quantityInc = (_id, qty) => {
    console.log({ _id, qty });
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };
  const quantityDec = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

  if (props.onlyCartItems) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) => (
          <CartItem
            key={index}
            cartItem={cartItems[key]}
            onQuantInc={quantityInc}
            onQuantDec={quantityDec}
          />
        ))}
      </>
    );
  }

 
  return (
    <Grid container direction="row">
      <Grid
        item
        container
        direction="column"
        xs={8}
        style={{ marginRight: "1em" }}
      >
        <Card className={classes.root}>
          {Object.keys(cartItems).map((key, index) => (
            <CartItem
              key={index}
              cartItem={cartItems[key]}
              onQuantInc={quantityInc}
              onQuantDec={quantityDec}
            />
          ))}
        </Card>
        <Button component={Link} to="/checkout">
          Proceed to Checkout
        </Button>
      </Grid>
      <PriceDetails
        totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
          return qty + cart.cartItems[key].qty;
        }, 0)}
        totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
          const { price, qty } = cart.cartItems[key];
          return totalPrice + price * qty;
        }, 0)}
      />
    </Grid>
  );
};

export default Cart;
