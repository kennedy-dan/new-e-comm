import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { Button, Card, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../actions'
import { Redirect } from "react-router-dom";

/**
 * @author
 * @function Login
 **/

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("")
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const userLogin = () => {
    dispatch(login({email, password}))
  }
  useEffect(() => {
    if(auth.authenticate){
      
    }
    
  }, [auth.authenticate])
  
  if(auth.authenticate){
    return <Redirect to = {'/'}/>
  }else{
    console.log('object');
  }
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h5" align="center">
          Signin
        </Typography>
      </Grid>
      <Grid item container direction="column" alignItems="center">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            required
            id="standard-required"
            label="Email"
            defaultValue="Email"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
          />
        </form>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            required
            id="standard-required"
            label="Required"
            defaultValue="Hello World"
            value={password}
            onChange={(e) =>setPassword(e.target.value)}
          />
        </form>
      </Grid>
      <Grid container='row' item justify='center'>
        <Button variant='contained' onClick={userLogin}>Sign in</Button>
      </Grid>
    </Grid>
  );
};

export default Login;
