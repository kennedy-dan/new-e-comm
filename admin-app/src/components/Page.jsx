import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Typography } from "@material-ui/core";
import createCats from "../helpers/createCats";
import { useDispatch, useSelector } from "react-redux";
import { createPage } from "../actions";
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

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Page = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const page = useSelector((state) => state.page);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBannerImages = (e) => {
    console.log(e);
    setBanners([...banners, e.target.files[0]]);
  };
  const handleProductImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  };

  const categoryChange = (e) => {
    const category = categories.find(
      (category) => category._id === e.target.value
    );
    setCategoryId(e.target.value);
    setType(category.type);
  };

  useEffect(() => {
    console.log("category", category);
    setCategories(createCats(category.categories));
  }, [category]);

  useEffect(() => {
    console.log("category", category);
    setCategories(createCats(category.categories));
  }, [category]);

  useEffect(() => {
    console.log(page)
    if(page.loading){
      setBanners([]);
      setCategoryId('');
      setDesc('')
      setProducts([])
      setTitle('')
      

    setOpen(false)
    }
  }, [page])

  const submtPage = () => {
    if(title === ''){
      alert('Title is required')
      setOpen(false);
      return
    }
    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);
    banners.map((banner, index) => {
      form.append("banners", banner);
    });
    products.map((product, index) => {
      form.append("products", product);
    });
    dispatch(createPage(form));
    // setOpen(false);
  };

  const renderCategoryPageModal = () => {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Ceate New Page</h2>
          <p id="simple-modal-description">
            <Grid container direction="column">
              <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="Page Title"
              />
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                onChange={categoryChange}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                label="Page Title"
              />

              {banners.length > 0
                ? banners.map((banner, index) => {
                    <div item direction="column">
                      {banner.name}
                    </div>;
                  })
                : null}
              <input type="file" name="banners" onChange={handleBannerImages} />

              {products.length > 0
                ? products.map((product, index) => {
                    <Grid item direction="row" container>
                      <Grid item direction="column">
                        {product.name}
                      </Grid>
                    </Grid>;
                  })
                : null}

              <input
                type="file"
                name="products"
                onChange={handleProductImages}
              />
            </Grid>
          </p>
          <Button onClick={submtPage}>save</Button>
        </div>
      </Modal>
    );
  };

  return (
    <Grid>
      {renderCategoryPageModal()}
      <Button onClick={() => setOpen(true)}>Add</Button>
    </Grid>
  );
};

export default Page;
