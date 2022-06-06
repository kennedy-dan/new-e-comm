import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../actions";
import Card from "@material-ui/core/Card";
import { CardContent, Grid } from "@material-ui/core";
import { publicUrl } from "../url";

/**
 * @author
 * @function Order
 **/

const Order = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <React.Fragment>
      {user.orders.map((order) => {
        return order.items.map((item) => (
          <Card style={{marginTop:'1em'}}>
            <Grid container direction='row' justify='space-evenly'>
            <CardContent>
              <img style={{maxWidth:'5em'}} src={publicUrl(item.productId.productPictures[0].img)} />
              </CardContent>
            <CardContent>{item.productId.name}</CardContent>
            <CardContent>{item.payablePrice}</CardContent>
            <CardContent>{order.paymentStatus}</CardContent>
            </Grid>
          </Card>
        ));
      })}
    </React.Fragment>
  );
};

export default Order;
