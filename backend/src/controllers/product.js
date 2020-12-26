const Product = require("../model/product");
const slugify = require("slugify");
const Category = require('../model/category')
exports.createProduct = (req, res) => {
  const { name, price, description, category, createdBy, quantity } = req.body;

  let productPictures = [];
  if (req.files.length > 0) {
    req.files.map((pix) => {
      productPictures.push({ img: pix.filename });
      return productPictures;
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
    quantity,
  });

  product.save((err, product) => {
    if (err) return res.status(400).json({ err });
    if (product) return res.status(200).json({ product });
  });
  // res.status(200).json({file: req.files, body: req.body})
};

exports.getProductSlug = (req, res) => {
  const {slug} = req.params;

  Category.findOne({slug: slug})
  .select('_id')
  .exec((err, category) => {
    if(err) return res.status(400).json({err})
    if (category) 
      Product.find({category: category._id})
      
      .exec((err, products) => {
        if (products) return res.status(200).json({
          products,
          productsByPrice: {
            under50k : products.filter(product => product.price < 50000),
            under100k : products.filter(product => product.price < 100000 && product.price >= 50000 ),
            under200k : products.filter(product => product.price < 200000 && product.price >= 100000 ),
            under800k : products.filter(product => product.price <= 800000 && product.price >= 200000 ),
            
          }
        }) 
      })
  })
}