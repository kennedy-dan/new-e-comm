import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductPage } from "../actions";
// import getParams from "../utils/getParams";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Typography from "@material-ui/core/Typography";
import { publicUrl } from "../url";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
const {getParams} =  require('../utils/getParams')


/**
 * @author
 * @function ProductPage
 **/

const useStyles = makeStyles({
  img: {
    // maxWidth: "40em",
    maxHeight: "30em",
  },
  im: {
    display: 'block'
  },
  prodImg: {
    // maxWidth: "90em",
    maxHeight: '15em'
  }
});
const ProductPage = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { page } = product;
  useEffect(() => {
    const params = getParams(props.location.search);
    console.log({ params });
    const payload = {
      params,
    };
    dispatch(getProductPage(payload));
  }, []);
  return (
    <Grid container direction='column'>
      <Typography>{page.title}</Typography>

      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, index) => (
            <a
            key={index}
            href={banner.navigateTo}
            className={classes.im}
            >
              <img src={banner.img} alt="" className={classes.img} />
            </a>
          ))}
      </Carousel>

      <Grid item container direction='row' >
        {page.products && page.products.map((product, index) => 
        <div key={index}>
          <img src={product.img} className={classes.prodImg}/>
        </div>
        )}
      </Grid>
    </Grid>
  );
};

export default ProductPage;
