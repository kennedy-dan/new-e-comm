import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ProductStore from "./ProductStore";
// import getParams from "../utils/getParams";
import ProductPage from "./productPage";
const {getParams} =  require('../utils/getParams')

/**
 * @author
 * @function Good
 **/

const useStyles = makeStyles({
 
});
const ProductList = (props) => {

  const renderProducts = () => {
    console.log(props)
    const params = getParams(props.location.search)
    let content = null

    switch (params.type) {
      case 'store':
        content = <ProductStore {...props}/>
        break;
      case 'page':
        content = <ProductPage {...props}/>
        break;
      default:
        content = null
    }
    return content
  }
 
  return (
    <div>
      {renderProducts()}
    </div>
  );
};

export default ProductList;
