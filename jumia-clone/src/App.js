import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/ui/Theme";
import Header from "./components/ui/Header";
import MenuItem from "./components/MenuItem";
import Headers from "./components/MenuItems";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ProductList from "./components/ProductList";
import Login from "./components/Login";
import Home from "./components/Home";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />

        <Headers />

        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/login" component={Login} />

          <Route exact path="/:slug" component={ProductList} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
