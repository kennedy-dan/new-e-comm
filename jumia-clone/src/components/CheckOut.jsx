import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAddress } from "../actions/user.action";
import Radio from "@material-ui/core/Radio";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AddressForm from "./AddressForm";
import PriceDetails from "./ui/PriceDetails";
import { getCartItems } from "../actions";
import Cart from "./cart";
const useStyles = makeStyles({
  onactive: {
    color: "#0B72B9",
  },
  offactive: {
    color: "",
  },
});

const CheckOutStep = (props) => {
  const classes = useStyles();

  return (
    <div>
      <div
        onClick={props.onClick}
        className={props.active ? classes.onactive : classes.offactive}
      >
        <div>
          <Typography variant="h2">{props.stepNumber}</Typography>
          <Typography variant="h5">{props.title}</Typography>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <Grid item container direction="column">
      <Grid item container direction="row" justify="space-between">
        <Grid item style={{ marginTop: "2em" }}>
          <Radio onClick={() => selectAddress(adr)} />
        </Grid>
        {!adr.edit ? (
          <div>
            <Grid item style={{ maxWidth: "12em", marginTop: "2em" }}>
              <Typography>{adr.name}</Typography>
              <Typography>{adr.addressType}</Typography>
              <Typography>{adr.mobileNumber}</Typography>
              <Typography>{adr.address}</Typography>
            </Grid>
            {adr.selected && (
              <Grid item style={{ marginTop: "1em" }}>
                {adr.selected && (
                  <Button
                    variant="outlined"
                    style={{
                      color: "#0B72B9",
                      borderRadius: 10,
                      border: "90em, solid, !important",
                    }}
                  >
                    edit
                    <EditOutlinedIcon
                      onClick={() => enableAddressEditForm(adr)}
                    />
                  </Button>
                )}
              </Grid>
            )}
            <Grid item>
              {adr.address} <br /> {`${adr.state} - ${adr.pinCode}`}
              {/* {selectedAddress.address}-
          {selectedAddress.pinCode} */}
            </Grid>
            <Grid item style={{ marginTop: "0.5em" }}>
              {adr.selected && (
                <Button
                  onClick={() => confirmDeliveryAddress(adr)}
                  style={{
                    background: "#0B72B9",
                    color: "white",
                  }}
                >
                  Deliver Here
                </Button>
              )}
            </Grid>
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
          />
        )}
      </Grid>
    </Grid>
  );
};

const CheckOut = (props) => {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);

  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmedAddress, setConfirmedAddress] = useState(false);
  const [selectedAddress, setselectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);

  const [cartItems, setCartItems] = useState(cart.cartItems);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  console.log(cart);
  console.log(auth);
  console.log(user);

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
  }, [user.address]);

  const selectAddress = (addr) => {
    // console.log(addr)
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };
  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
    // setNewAddress(true);
  };

  const onAddressSubmit = (addr) => {
    setselectedAddress(addr);
    setConfirmedAddress(true);
    setOrderSummary(true);
  };

  const confirmDeliveryAddress = (addr) => {
    setselectedAddress(addr);
    setConfirmedAddress(true);
    setOrderSummary(true);
  };

  console.log(selectedAddress);

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };

  const onConfirmOrder = () => {
    const totalPrice = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
      const { price, qty } = cart.cartItems[key];
      return totalPrice + price * qty;
    }, 0);
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQuantity: cart.cartItems[key].qty,
    }));
    const payload = {
      addressId: selectedAddress._id,
      totalAmount: totalPrice,
      items,
      paymentStatus: "pending",
      paymentType: "cod"
    };
    console.log(payload)
    dispatch(addOrder(payload))
    setConfirmOrder(true);
  };

  if (confirmOrder) {
    return (
      <Card>
        <CardContent>THANK</CardContent>
      </Card>
    );
  }
  return (
    <Grid container direction="row" justify="space-around">
      <Grid item direction="column" xs={8} style={{ marginRight: "2em" }}>
        <Card>
          <CardContent>
            <CheckOutStep
              stepNum={1}
              title={"Login"}
              active={!auth.authenticate}
              body={
                auth.authenticate ? (
                  <div>
                    <Typography>{auth.user.fullName}</Typography>
                    <Typography>{auth.user.email}</Typography>
                  </div>
                ) : (
                  <TextField label="email" />
                )
              }
            />
          </CardContent>
        </Card>

        <Card style={{ marginTop: "1em" }}>
          <CardContent>
            <CheckOutStep
              stepNum={2}
              title={"Delivery Address"}
              active={!confirmedAddress && auth.authenticate}
              body={
                <>
                  {confirmedAddress ? (
                    <Grid container direction="row" justify="space-between">
                      <Grid item>
                        {selectedAddress.address}- {selectedAddress.pinCode}
                        {console.log(selectedAddress.address)}
                      </Grid>
                      <Grid item>
                        <EditOutlinedIcon />
                      </Grid>
                    </Grid>
                  ) : (
                    address.map((adr) => (
                      <Address
                        selectAddress={selectAddress}
                        enableAddressEditForm={enableAddressEditForm}
                        confirmDeliveryAddress={confirmDeliveryAddress}
                        onAddressSubmit={onAddressSubmit}
                        adr={adr}
                      />
                    ))
                  )}
                </>
              }
            />
          </CardContent>
        </Card>

        {confirmedAddress ? null : newAddress ? (
          <AddressForm onSubmitForm={onAddressSubmit} />
        ) : (
          <CheckOutStep
            stepNum={1}
            title={
              <Button
                style={{
                  background: "#0B72B9",
                  marginTop: "1em",
                  color: "white",
                }}
              >
                Delivery Address
              </Button>
            }
            onClick={() => setNewAddress(true)}
          />
        )}

        <Card style={{ marginTop: "1em" }}>
          <CardContent>
            <CheckOutStep
              stepNum={3}
              title={"Order Summary"}
              active={orderSummary}
              body={
                orderSummary ? (
                  <Cart onlyCartItems={true} />
                ) : orderConfirmation ? (
                  <div>{Object.keys(cartItems).length}</div>
                ) : null
              }
            />
          </CardContent>
        </Card>

        {orderSummary && (
          <Card style={{ marginTop: "1em" }}>
            <CardContent>
              <Grid container direction="row" justify="space-between">
                <Grid item>
                  <Typography>
                    Order confirmation email will be sent to {auth.user.email}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    style={{ color: "white", background: "#0B72B9" }}
                    onClick={userOrderConfirmation}
                  >
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        <Card style={{ marginTop: "1em" }}>
          <CardContent>
            <CheckOutStep
              stepNum={4}
              title={"Payment Option"}
              active={paymentOption}
              body={
                <Grid container direction="row">
                  <Grid item container direction="row">
                    <Radio />
                    <Typography style={{ marginTop: "0.5em" }}>
                      Cash on delivery
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Button
                      onClick={onConfirmOrder}
                      style={{ color: "white", background: "#0B72B9" }}
                    >
                      Confirm Order
                    </Button>
                  </Grid>
                </Grid>
              }
            />
          </CardContent>
        </Card>
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

export default CheckOut;
