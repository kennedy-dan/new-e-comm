const slugify = require("slugify");
const Category = require("../model/category");
const shortId = require('shortid')

function addCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  // console.log(category.name);

  category.map((cat) => {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      type: cat.type,
      parentId: cat.parentId,
      children: addCategories(categories, cat._id),
    });
    // console.log(cat.name[0])
  });
  return categoryList;
}

exports.createCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortId.generate()}`,
  };
  if (req.file) {
    categoryObj.categoryImage =
      process.env.API + "/public/" + req.file.filename;
  }
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const cat = new Category(categoryObj);
  cat.save((err, category) => {
    if (err) return res.status(400).json({ err });
    if (category) return res.status(201).json({ category });
  });
};

exports.getCategory = (req, res) => {
  Category.find({}).exec((err, categories) => {
    if (err) return res.status(400).json({ err });

    if (categories) {
      const categoryList = addCategories(categories);
      return res.status(200).json({ categoryList });
    }
  });
};

exports.updateCategory = async (req, res) => {
  const {_id, name, parentId, type }= req.body;
  const updateCategories = [];
  if (name instanceof Array) {
    for (i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updateCategories.push(updatedCategory);
    }
      return res.status(201).json({ updateCategory: updateCategories });

  } else {
    const category = {
      name: name,
      type: type,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate(
      { _id },
      category,
      { new: true }
    );
    return res.status(201).json({ updatedCategory });
  }
};

exports.deleteCategory = async(req, res) => {
  const {ids} = req.body.payload
  const deleteCategories = []
  for(i=0; i<ids.length; i++){
    const deleteCategory = await Category.findOneAndDelete({_id: ids[i]._id})
    deleteCategories.push(deleteCategory)
  }
  if(deleteCategories.length == ids.length){
    res.status(201).json({msg:'category deleted'})
  }else{
    res.status(400).json({msg:'category not del'})
  }
}