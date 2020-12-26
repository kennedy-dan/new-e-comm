import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions";
import { Redirect } from "react-router-dom";
/**
 * @author
 * @function Signin
 **/
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      //   margin: theme.spacing(1),
      marginTop: "3em",
      width: "19em",
    },
  },
  btn: {
    marginTop: "2em",
  },
}));
const Signin = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = useSelector((state) => state.auth);


  const dispatch = useDispatch();
  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email, password 
    };
    dispatch(login(user));
  };

  if(auth.authenticate){
    return <Redirect to = {'/'}/>
  }else{
    console.log('object');
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

 

  return (
    <form>
      <Grid direction="column" align="center" className={classes.root}>
        <Grid item>
          <TextField label="email" onChange={handleEmail} value={email} />
        </Grid>
        <Grid item>
          <TextField
            label="password"
            onChange={handlePassword}
            value={password}
          />
        </Grid>
        <Grid item className={classes.btn}>
          <Button variant="contained" onClick={userLogin}>
            Default
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Signin;
