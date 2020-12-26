import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup } from "../actions";

/**
 * @author
 * @function Signup
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

const Signup = (props) => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);


  const dispatch = useDispatch()

  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  } 

  if (user.loading){
    return <p>loading ...</p>
  }

  const userSignup = (e) => {
    e.preventDefault()
    const user = {
      firstName, lastName,email, password
    }
    dispatch(signup(user))
  } 

  const handleFname = (e) => {
    setFirstName(e.target.value)

  }

  const handleLname = (e) => {
    setLastName(e.target.value)
    
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }


  return (
    <form onSubmit= {userSignup}>
      <Grid container direction="column" align="center" className={classes.root}>
      {user.user}
        <Grid item>
          <TextField label="firstname" value={firstName} onChange= {handleFname} />
        </Grid>
        <Grid item>
          <TextField label="lastname" value={lastName} onChange= {handleLname}  />
        </Grid>
        <Grid item>
          <TextField label="email" value={email} onChange= {handleEmail}  />
        </Grid>
        <Grid item>
          <TextField label="password" value={password} onChange= {handlePassword}  />
        </Grid>
        <Grid item className={classes.btn}>
          <Button variant="contained" onClick={userSignup}>Default</Button>

        </Grid>
      </Grid>
    </form>
  );
};

export default Signup;
