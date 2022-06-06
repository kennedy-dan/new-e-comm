import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../actions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { publicUrl } from "../url";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  btn: {
    marginTop: "2em",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,

    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    marginTop: "4em",
  },
  table: {
    minWidth: 650,
  },
  displaypix: {
    display: "flex",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", "juijl"),
  createData("Ice cream sandwich"),
  createData("Eclair"),
  createData("Cupcake"),
  createData("Gingerbread"),
];

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const Products = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productDetailModal, setproductDetailModal] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [productPicture, setproductPicture] = useState([]);
  const [productDetails, setproductDetails] = useState(null);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const auth = useSelector(state => state.auth)

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append('category', categoryId)

    productPicture.map((pic) => {
      form.append("productPictures", pic);
    });

    dispatch(addProduct(form));

    setOpen(false);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handlePrize = (e) => {
    setPrice(e.target.value);
  };

  const handleProductImg = (e) => {
    setproductPicture([...productPicture, e.target.files[0]]);
  };
  console.log(productPicture);
  const createCats = (categories, options = []) => {
    categories.map((cats) => {
      options.push({ value: cats._id, name: cats.name });
      if (cats.children.length > 0) {
        createCats(cats.children, options);
      }
    });

    return options;
  };

  const handleCloseProductionDetailsModal = () => {
    setproductDetailModal(false);
  };

  const showProductDetailsModal = (product) => {
    setproductDetails(product);
    setproductDetailModal(true);
    console.log(product);
  };

  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <Modal
        open={productDetailModal}
        onClose={handleCloseProductionDetailsModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Product</h2>
          <p id="simple-modal-description">
            <label>Name</label>
            <p>{productDetails.name}</p>

            <label>Description</label>
            <p>{productDetails.description}</p>

            <label>Description</label>
            <p>{productDetails.category.name}</p>

            <label>Quantity</label>
            <p>{productDetails.quantity}</p>
            <label>Product Picture</label>
          </p>
          {productDetails.productPictures.map((pictures) => (
            <Grid container direction= 'row'>
               <Grid item xs={6} >
                 <div >
                 <img
                className={classes.displaypix}
                src={publicUrl(pictures.img)}
              />
                 </div>
              
               </Grid>
               
            
            </Grid>
           
          ))}
        </div>
      </Modal>
    );
  };

  const renderAddProductModal = () => {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Text in a modal</h2>
          <p id="simple-modal-description">
            <TextField onChange={handleChange} value={name} label="name" />
            <TextField
              onChange={handleQuantity}
              value={quantity}
              label="quantity"
            />
            <TextField onChange={handlePrize} value={price} label="prize" />
            <TextField
              onChange={handleDescription}
              value={description}
              label="description"
            />

            <InputLabel id="demo-simple-select-label" className={classes.input}>
              Select category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              // className= {classes.select}
            >
              {createCats(category.categories).map((opts) => (
                <MenuItem value={opts.value}>{opts.name}</MenuItem>
              ))}
              {/* <MenuItem value={10}>Ten</MenuItem> */}
            </Select>
          </p>
          {productPicture.length > 0
            ? productPicture.map((pic, index) => (
                <div key={index}>{pic.name}</div>
              ))
            : null}
          <input
            type="file"
            name="productPicture"
            onChange={handleProductImg}
          ></input>
          <Button variant="outlined" onClick={handleClose}>
            Save
          </Button>
        </div>
      </Modal>
    );
  };

  return (
    <Grid container direction="column">
      <Grid item>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>number</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Category</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {product.products.length > 0
                ? product.products.map((prod) => (
                    <TableRow
                      onClick={() => showProductDetailsModal(prod)}
                      key={prod._id}
                    >
                      <TableCell component="th" scope="row">
                        1
                      </TableCell>
                      <TableCell align="right">{prod.name}</TableCell>
                      <TableCell align="right">{prod.price}</TableCell>
                      <TableCell align="right">{prod.quantity}</TableCell>
                      <TableCell align="right">{prod.category.name}</TableCell>

                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item>
        <button type="button" onClick={handleOpen}>
          Open Modal
        </button>
        {renderAddProductModal()}
        {renderProductDetailsModal()}
      </Grid>
    </Grid>
  );
};

export default Products;
