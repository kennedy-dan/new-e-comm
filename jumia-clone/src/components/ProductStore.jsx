import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../actions";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Grid } from "@material-ui/core";
import { publicUrl } from "../url";
import { useState } from "react";
import {Link} from 'react-router-dom'

/**
 * @author
 * @function Good
 **/

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
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
  img: {
    maxWidth: "15em",
  },
  col: {
    marginLeft: "3em",
  },
  prods: {
    display: 'flex'
  }
});
const ProductStore = (props) => {
  const classes = useStyles();
  const product = useSelector((state) => state.product);
console.log(product)
const [priceRange, setpriceRange] = useState({
  under50k : 50000,
  under100k: 100000,
  under200k: 200000,
  under800k: 800000
})
  const dispatch = useDispatch();
  useEffect(() => {
  const { match } = props;

    dispatch(getProductBySlug(match.params.slug));
  }, []);
  return (
    <div>
      {Object.keys(product.productsByPrice).map((key, index) => {
        console.log(key)

        return (
          <Card className={classes.root}>
            <CardContent>
              <Grid container direction="column">
                <Grid item container direction="row" justify="space-between">
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {props.match.params.slug} Below {priceRange[key]}
                  </Typography>
                  <Button size="small">Learn More</Button>
                </Grid>
                <Divider />

                <div className={classes.prods}>

                {product.productsByPrice[key].map((product) => (
                  <Link to={`/${product.slug}/${product._id}/p`}>
                  <Grid item container direction="row" >
                    <Grid item direction="column">
                      <img
                        className={classes.img}
                        src={publicUrl(product.productPictures[0].img)}
                      />
                      {console.log(product.productPictures[0].img)}
                      <Typography className={classes.col}>
                        {product.name}
                      </Typography>
                      <Typography className={classes.col}>{product.price}</Typography>
                    </Grid>
                  </Grid>
                  </Link>

                ))}
                </div>
              </Grid>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProductStore;
