import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { updateOrder } from "../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "2em",
  },
}));

function getSteps() {
  return ["order", "packed", "shipped", "delivered"];
}

const Order = (props) => {
  const classes = useStyles();
  const steps = getSteps();

  const [type, setType] = useState("");
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updateOrder(payload));
  };

  return (
    <React.Fragment>
      {order.orders.map((orderitem, index) => (
        <div key={index} className={classes.root}>
          <Typography style={{ marginLeft: "4em" }}>{orderitem._id}</Typography>
          <Stepper alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>
                  <Typography>kg</Typography>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <select onChange={(e) => setType(e.target.value)}>
            {orderitem.orderStatus.map((status) => {
              return (
                <>
                  {!status.isCompleted ? (
                    <option value={status.type}>{status.type}</option>
                  ) : null}
                </>
              );
            })}
          </select>
          <Button onClick={() => onOrderUpdate(orderitem._id)}>Confirm</Button>
          <hr />
        </div>
      ))}
    </React.Fragment>
  );
};

export default Order;
