import React, {useEffect} from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/ui/Theme";
import Header from "./components/ui/Header";
import MenuItem from "./components/MenuItem";
import Headers from "./components/MenuItems";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ProductList from "./components/ProductList";
import Login from "./components/Login";
import Home from "./components/Home";
import { isUserLogged, initialData, getCategories, updateCart } from "./actions";


import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "./components/productDetails";
import Cart from "./components/cart";
import CheckOut from "./components/CheckOut";
import Order from "./components/order";


function App() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLogged());
    }
  }, [auth.authenticate])

  useEffect(() => {
    console.log("App.js - updateCart");
    dispatch(updateCart());
  }, [auth.authenticate]);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Headers />

        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/:productSlug/:productId/p" component={ProductDetails} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={CheckOut} />
          <Route exact path="/account/order" component={Order} />

          
          <Route exact path="/:slug" component={ProductList} />
          {/* <Route exact path="/:productSlug/:productId/p" component={ProductDetails} /> */}

        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
