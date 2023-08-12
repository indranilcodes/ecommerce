
const Products = require('../models/productModel');

const Category = require('../models/categoryModel');

const fs = require('fs');

const slugify = require('slugify');


// const productModel = require('../models/productModel');


// create product...
const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }


  const products = new Products({ ...req.fields, slug: slugify(name) });

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};


//get all product...
const getProductController = async (req, res) => {

  try {
    const products = await Products.find({})
      .populate('category')
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: 'All Products',
      products,

    })

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: 'Error in the getting the product',
      error: error.message
    })
  }
}


//get single product...
const getSingleProductController = async (req, res) => {
  try {
    const product = await Products
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate('category');

    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error in the getting the single product',
      error: error.message
    })
  }
}

//get photo...
const productPhotoController = async (req, res) => {
  try {

    const product = await Products.findById(req.params.pid).select("photo");

    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);

      return res.status(200).send(product.photo.data)
    }

  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: 'Error while getting the object',
      error: error,
    })
  }

}

//delete product..
const deleteProductController = async (req, res) => {

  try {

    await Products.findByIdAndDelete(req.params.pid).select("-photo");

    res.status(200).send({
      success: true,
      message: "Product Delete Succesfully",
    });

  } catch (error) {
    res.status(500).send({
      success: true,
      message: "Error in the delete product",
      error: error
    })
  }

}

//update productController....
const updateProductController = async (req, res) => {
  try {

    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await Products.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true });

    if (photo) {

      products.photo.data = fs.readFileSync(photo.path);

      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: true,
      message: "Error in the update Product",
      error: error
    })
  }
}

//filter controller...
const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Products.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Products",
      error,
    });
  }
}

const productCountController = async (req, res) => {
  try {
    const total = await Products.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
}

//product list page..
const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await Products
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }

}


//search product..
const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await Products
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
}


//similiar product
const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await Products
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
}


//get product by category...
const productCategoryController = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    const products = await Products.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
}


module.exports = {
  createProductController,
  getProductController,
  getSingleProductController, productPhotoController,
  deleteProductController, updateProductController, productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  realtedProductController, productCategoryController,
};

