import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getCategories,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from "../actions";
import { Typography } from "@material-ui/core";
import CheckboxTree from "react-checkbox-tree";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import { format } from "path";
// import UpdateCategoriesModal from "./UpdateCategoriesModal";
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
    width: 700,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    marginTop: "4em",
  },

  input: {
    marginTop: "1em",
  },
  delBtn: {
    marginRight: "1em",
  },
}));

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

const Category = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [close, setClose] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [age, setAge] = React.useState("");

  const category = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const form = new FormData();
      // if(categoryName === ''){
      //   alert('name is required')
      // }
    form.append("name", categoryName);
    form.append("parentId", categoryId);
    form.append("categoryImage", categoryImage);

    dispatch(addCategory(form));
    setCategoryId("");
    setCategoryName("");
    setOpen(false);
  };

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleImgChange = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleSelectChange = (e) => {
    setCategoryId(e.target.value);
  };

  const updateCategory = () => {
    setUpdateCategoryModal(true);
    updatedExpandedCategories();
  };

  const updatedExpandedCategories = () => {
    const categories = createCats(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.map((categoryId, index) => {
        console.log(categoryId);
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        console.log(category);
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.map((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    console.log({  checkedArray, expandedArray });
  };
  const updateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.map((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    checkedArray.map((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    dispatch(updateCategories(form))
    setUpdateCategoryModal(false);
  };

  const handleCategoryInput = (key, value, index, type) => {
    console.log(index);
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        // console.log('_index',_index,'item', item)

        _index === index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        _index === index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };
  const renderCategories = (categories) => {
    let myCategories = [];
  
    for (let cats of categories) {
      myCategories.push({
        label: cats.name,
        value: cats._id,
        children: cats.children.length > 0 && renderCategories(cats.children),
      });
    }
    return myCategories;
  };

  const createCats = (categories, options = []) => {
    categories.map((cats) => {
      options.push({
        value: cats._id,
        name: cats.name,
        parentId: cats.parentId,
        type: cats.type
      });
      if (cats.children.length > 0) {
        createCats(cats.children, options);
      }
    });

    return options;
  };

  const renderCategoryUpdateModal = () => {
    return (
      <Modal
        open={updateCategoryModal}
        onClose={() =>  setUpdateCategoryModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Update Category</h2>
          <p id="simple-modal-description">
            <Typography>Expanded</Typography>

            {expandedArray.length > 0 &&
              expandedArray.length > 0 &&
              expandedArray.map((item, index) => (
                <Grid container direction="column">
                  <Grid
                    key={index}
                    container
                    direction="row"
                    justify="space-evenly"
                  >
                    {console.log(index)}

                    <TextField
                      onChange={(e) =>
                        handleCategoryInput(
                          "name",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                      value={item.name}
                      label="category name"
                    />
                    <InputLabel
                      id="demo-simple-select-label"
                      className={classes.input}
                    >
                      Select category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={item.parentId}
                      onChange={(e) =>
                        handleCategoryInput(
                          "name",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                      // className= {classes.select}
                    >
                      {createCats(category.categories).map((opts) => (
                        <MenuItem value={opts.value}>{opts.name}</MenuItem>
                      ))}
                    </Select>
                    <InputLabel
                      id="demo-simple-select-label"
                      className={classes.input}
                    >
                      Select Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={item.type}
                      onChange={(e) =>
                        handleCategoryInput(
                          "type",
                          e.target.value,
                          index,
                          "expanded"
                        )}
                    >
                      <MenuItem value="">Select Type</MenuItem>
                      <MenuItem value="store">store</MenuItem>
                      <MenuItem value="product">product</MenuItem>
                      <MenuItem value="page">page</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              ))}
            <Typography>Checked</Typography>

            {checkedArray.length > 0 &&
              checkedArray.length > 0 &&
              checkedArray.map((item, index) => (
                <Grid
                  key={index}
                  container
                  direction="row"
                  justify="space-evenly"
                >
                  {console.log("checked", index)}

                  <TextField
                    onChange={(e) =>
                      handleCategoryInput(
                        "name",
                        e.target.value,
                        index,
                        "checked"
                      )
                    }
                    value={item.name}
                    label="category name"
                  />
                  <InputLabel
                    id="demo-simple-select-label"
                    className={classes.input}
                  >
                    Select category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={item.parentId}
                    onChange={(e) =>
                      handleCategoryInput(
                        "name",
                        e.target.value,
                        index,
                        "checked"
                      )
                    }
                  >
                    {createCats(category.categories).map((opts) => (
                      <MenuItem value={opts.value}>{opts.name}</MenuItem>
                    ))}
                  </Select>
                  <InputLabel
                    id="demo-simple-select-label"
                    className={classes.input}
                  >
                    Select Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value= {item.type}
                    onChange={(e) =>
                      handleCategoryInput(
                        "type",
                        e.target.value,
                        index,
                        "checked"
                      )}
                  >
                    <MenuItem value="">Select Type</MenuItem>
                    <MenuItem value="store">store</MenuItem>
                    <MenuItem value="product">product</MenuItem>
                    <MenuItem value="page">page</MenuItem>
                  </Select>
                </Grid>
              ))}
          </p>
          <input
            type="file"
            name="category Image"
            onChange={handleImgChange}
          ></input>
          <Grid item container justify="flex-end">
            <Button variant="outlined" onClick={updateCategoriesForm}>
              Save
            </Button>
          </Grid>
        </div>
      </Modal>
    );
  };

  const deleteCategory = () => {
    updatedExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = checkedIdsArray.concat(expandedIdsArray);
    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray)).then((result) => {
        if (result) {
          dispatch(getCategories());
          setDeleteCategoryModal(false);
        }
      });
    }
    setDeleteCategoryModal(false);

  };

  const renderDeleteCategoryModal = () => {
    return (
      <Modal
        open={deleteCategoryModal}
        onClose={() => setDeleteCategoryModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Add Category</h2>
          <p id="simple-modal-description">
            <Grid container direction="column">
              <Typography>Expanded</Typography>
              {expandedArray.map((item, index) => (
                <Typography key={index}>{item.name}</Typography>
              ))}
              <Typography>Clicked</Typography>
              {checkedArray.map((item, index) => (
                <Typography key={index}>{item.name}</Typography>
              ))}

              <Grid item container direction="row" justify="flex-end">
                <Button variant="contained">No</Button>
                <Button variant="contained" onClick={deleteCategories}>
                  Yes
                </Button>
              </Grid>
            </Grid>
          </p>
        </div>
      </Modal>
    );
  };

  return (
    <Grid container direction="column">
      <Grid item align="center">
        <Typography>Category</Typography>
      </Grid>
      <Grid item container justify="center">
        <CheckboxTree
          nodes={renderCategories(category.categories)}
          checked={checked}
          expanded={expanded}
          onCheck={(checked) => setChecked(checked)}
          onExpand={(expanded) => setExpanded(expanded)}
          icons={{
            check: <CheckBoxIcon />,
            uncheck: <CheckBoxOutlinedIcon />,
            halfCheck: <CheckBoxOutlinedIcon />,
            expandClose: <ArrowForwardOutlinedIcon />,
            expandOpen: <ArrowDownwardOutlinedIcon />,
          }}
        />
      </Grid>
      <Grid item align="center" className={classes.btn}>
        <Button variant="contained" onClick={handleOpen}>
          Add Categories
        </Button>
      </Grid>
      <Grid item container justify="center" direction="row">
        <Button
          variant="outlined"
          className={classes.delBtn}
          onClick={deleteCategory}
        >
          Delete
        </Button>
        <Button variant="outlined" onClick={updateCategory}>
          Edit
        </Button>
      </Grid>
      <Grid container item direction="column">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Add Category</h2>
            <p id="simple-modal-description">
              <TextField
                onChange={handleChange}
                value={categoryName}
                label="category name"
              />
              <InputLabel
                id="demo-simple-select-label"
                className={classes.input}
              >
                Select category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                onChange={handleSelectChange}
                // className= {classes.select}
              >
                {createCats(category.categories).map((opts) => (
                  <MenuItem value={opts.value}>{opts.name}</MenuItem>
                ))}
              </Select>
            </p>
            <input
              type="file"
              name="category Image"
              onChange={handleImgChange}
            ></input>
            <Button variant="outlined" onClick={handleClose}>
              Save
            </Button>
          </div>
        </Modal>
        
        {renderCategoryUpdateModal()}
        {renderDeleteCategoryModal()}
      </Grid>
    </Grid>
  );
};

export default Category;
