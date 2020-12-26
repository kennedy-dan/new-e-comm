import React, {useEffect} from "react";
import Header from "./components/ui/Header";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/ui/Theme";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Private from "./components/HOC/Private";
import { useDispatch, useSelector } from "react-redux";
import { isUserLogged, initialData, getCategories } from "./actions";
import Products from "./components/Products";
import Order from "./components/Order";
import Category from "./components/Category";
import Page from "./components/Page";
function App() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLogged());
    }
    if(auth.authenticate){
    dispatch(initialData());

    }

  }, [auth.authenticate]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Switch>
        <Private exact path="/" component={Home} />
        <Private exact path="/products" component={Products} />
        <Private exact path="/order" component={Order} />
        <Private exact path="/category" component={Category} />
        <Private exact path="/page" component={Page} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
