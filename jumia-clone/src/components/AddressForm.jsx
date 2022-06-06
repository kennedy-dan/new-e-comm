import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import { Button, Divider, Grid, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import { useDispatch, useSelector } from "react-redux";
import Radio from "@material-ui/core/Radio";
import { addAddress } from "../actions/user.action";

const AddressForm = (props) => {
  const { initialData } = props;
  const [name, setName] = useState(initialData ? initialData.name : "");
  const [mobileNumber, setMobileNumber] = useState(
    initialData ? initialData.mobileNumber : ""
  );
  const [pinCode, setPinCode] = useState(
    initialData ? initialData.pinCode : ""
  );
  const [locality, setLocality] = useState(
    initialData ? initialData.locality : ""
  );
  const [address, setAddress] = useState(
    initialData ? initialData.address : ""
  );
  const [cityDistrictTown, setCityDistrictTown] = useState(
    initialData ? initialData.cityDistrictTown : ""
  );
  const [state, setState] = useState(initialData ? initialData.state : "");
  const [landmark, setLandmark] = useState(
    initialData ? initialData.landmark : ""
  );
  const [alternatePhone, setAlternatePhone] = useState(
    initialData ? initialData.alternatePhone : ""
  );
  const [addressType, setAddressType] = useState(
    initialData ? initialData.addressType : ""
  );
  const [submitFlag, setSubmitFlag] = useState(false);
  const [id, setId] = useState(initialData ? initialData._id : "");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const onAddressSubmit = (e) => {
    const payload = {
      address: {
        name,
        mobileNumber,
        pinCode,
        locality,
        address,
        cityDistrictTown,
        state,
        landmark,
        alternatePhone,
        addressType,
      },
    };
    console.log(payload);
    if (id) {
      payload.address._id = id;
    }
    dispatch(addAddress(payload));
  };

  useEffect(() => {
    console.log("addressCount", user.address);
    if (submitFlag) {
      console.log("where are we", user);
      let _address = {};
      if (id) {
        _address = {
          _id: id,
          name,
          mobileNumber,
          pinCode,
          locality,
          address,
          cityDistrictTown,
          state,
          landmark,
          alternatePhone,
          addressType,
        };
      } else {
        _address = user.address.slice(user.address.length - 1)[0];
      }
      props.onSubmitForm(_address);
    }
  }, [user.address]);

  const renderAddressForm = () => {
    return (
      <Grid container directon="column">
        <Grid item container direction="column" alignItems="">
          <Grid item>
            <Typography>1.Adress</Typography>
          </Grid>
          <Grid item container direction="column">
            <TextField
              label="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <TextField
              label="pincode"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
            <TextField
              label="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              label="city"
              value={cityDistrictTown}
              onChange={(e) => setCityDistrictTown(e.target.value)}
            />
            <TextField
              label="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            <TextField
              label="landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
            <TextField label="mobile number II" />
          </Grid>
        </Grid>
        <Button
          style={{ background: "#0B72B9", color: "white", marginTop: "1em" }}
          onClick={onAddressSubmit}
        >
          Deliver Here
        </Button>
      </Grid>
    );
  };

  if (props.withoutLayout) {
    return <div>{renderAddressForm()}</div>;
  }

  return (
    <Card style={{ marginTop: "1em" }}>
      <CardContent>{renderAddressForm()}</CardContent>
    </Card>
  );
};

export default AddressForm;
