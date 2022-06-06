import { Button, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddShoppingCartRoundedIcon from "@material-ui/icons/AddShoppingCartRounded";
import IconButton from "@material-ui/core/IconButton";

import { getProductDetailsByid } from "../actions";
import { publicUrl } from "../url";
import {addToCart} from'../actions'

/**
 * @author
 * @function ProductDetails
 **/

const ProductDetails = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  useEffect(() => {
    const { productId } = props.match.params;
    console.log(props);
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsByid(payload));
    console.log(payload);
  }, []);
  return (
    // <div>{product.productDetails.name}</div>
    <Grid container direction="row">
      <Grid item container direction="column" sm justify='center' style={{marginLeft: '2em'}}>
        <Grid container direction="row" item >
          <Grid item direction="column">
            {product.productDetails.productPictures &&
              product.productDetails.productPictures.map((thumb, index) => (
                <img
                  style={{
                    display: "flex",
                    overflow: "hidden",
                    height: "60px",
                    width: "50px",
                    marginTop: "2em",
                  }}
                  src={publicUrl(thumb.img)}
                />
              ))}
          </Grid>
          <Grid item>
            <img
              src={publicUrl(
                product.productDetails.productPictures &&
                  product.productDetails.productPictures[0].img
              )}
            />
          </Grid>
        </Grid>

        <Grid container direction="row"  spacing={2} style={{marginLeft: '4em'}}>
          <Grid item>
            <IconButton style={{ background: "#0B72B9" }} onClick={() => {
              const {_id, name, price} = product.productDetails
              const img = 
              product.productDetails.productPictures[0].img
              dispatch(addToCart({_id, name, price, img}))
              props.history.push('/cart')
            }}>
              <AddShoppingCartRoundedIcon />
              <Typography>Add To Cart</Typography>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton style={{ background: "#0B72B9" }}>
              <AddShoppingCartRoundedIcon />
              <Typography>Buy Now</Typography>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>


      <Grid item container direction="column" sm >
        <Grid item>
        <Typography variant = 'h6'>{product.productDetails.name}</Typography>
        </Grid>
        <Grid item>
        <Typography>{product.productDetails.description}</Typography>
        </Grid>
        <Grid item>
        <Typography>{product.productDetails.price}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
