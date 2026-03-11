import express from 'express';
import { createProduct, deleteProduct, getAllProducts } from '../controllers/productController.js';

const productRounter = express.Router();

productRounter.get("/",getAllProducts);
productRounter.post("/",createProduct);
productRounter.delete("/:productID",deleteProduct);

export default productRounter