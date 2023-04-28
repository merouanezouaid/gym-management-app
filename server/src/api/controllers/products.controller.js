const Product = require("./../models/products")

exports.addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.send(product)
    } catch(err) {
    
      console.log(err);
    }
}
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products)
    } catch(err){
        console.log(err);
    }
}