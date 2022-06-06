import {
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import React from "react";

const PriceDetails = (props) => {
  return (
    <Grid item direction="column" xs>
      <Card>
        <CardContent>
          <Typography>Price Details</Typography>
        </CardContent>
        <Divider />

        <CardContent>
          <Grid container direction="column">
            <Grid item container direction="row" justify="space-between">
              <div>Price ({props.totalItem} items)</div>
              <div>{props.totalPrice}</div>
            </Grid>
            <Grid item container direction="row" justify="space-between">
              <div>Delivery Charges</div>
              <div>FREE</div>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardContent>
        <Grid item container direction="row" justify="space-between">
        <div>Total Amount</div>
    <div>{props.totalPrice}</div>
            </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PriceDetails;

{
  /* <Card headerLeft={"Price Details"} style={{ maxWidth: "380px" }}>
<div
  style={{
    padding: "20px",
    boxSizing: "border-box",
  }}
>
  <div className="flexRow sb" style={{ margin: "10px 0" }}>
    <div>Price ({props.totalItem} items)</div>
    <div>{props.totalPrice}</div>
  </div>
  <div className="flexRow sb" style={{ margin: "10px 0" }}>
    <div>Delivery Charges</div>
    <div>FREE</div>
  </div>
  <div className="flexRow sb" style={{ margin: "10px 0" }}>
    <div>Total Amount</div>
    <div>{props.totalPrice}</div>
  </div>
</div>
</Card> */
}
