import React, { useState } from "react";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { addToCart } from "../actions";
import { Button, Card, Grid } from "@material-ui/core";
import { publicUrl } from "../url";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  img: {
    height: "4em",
    marginTop: "-1em",
  },
});

const CartItem = (props) => {
  const classes = useStyles();
  const [qty, setQty] = useState(props.cartItem.qty)
  const { _id, name, price, img } = props.cartItem;

  const onQuantIncrement = () => {
    setQty(qty + 1)
    props.onQuantInc(_id, qty + 1)
  }

  const onQuantDecrement = () => {
    if(qty <= 1)return 
    setQty(qty - 1)
    props.onQuantDec(_id, qty - 1)
  }
  return (
    
    <CardContent>
      <Grid container direction="row" justify='space-between'>
        <Grid item>
          <img src={publicUrl(img)} className={classes.img} />
        </Grid>
        <Grid item  direction="column">
          <Typography>name</Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {name}
          </Typography>
        </Grid>
        <Grid item  direction="column">
          <Typography>Price</Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {price}
          </Typography>
        </Grid>
        <Grid item  direction="column">
          <Typography>quantity</Typography>
          <Typography className={classes.pos} color="textSecondary">
            {qty}
            <button onClick={onQuantIncrement}>+</button>
            <button onClick={onQuantDecrement}>-</button>

          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default CartItem;
