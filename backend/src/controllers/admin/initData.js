const Category = require("../../model/category");
const Product = require("../../model/product");
const Order = require("../../model/order");
function addCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category=categories.filter((cat) => cat.parentId == parentId);
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
  return categoryList

}

exports.initData = async (req, res) => {
  const categories = await Category.find({}).exec();
  const products = await Product.find({})
    .select("_id name productPictures slug category description quantity price")
    .populate({path: 'category', select: '_id name'})
    .exec();
    const orders = await Order.find({})
    .populate("items.productId", "name")
    .exec();
  res.status(200).json({
    categories: addCategories(categories),
    products,
    orders
  });
};
