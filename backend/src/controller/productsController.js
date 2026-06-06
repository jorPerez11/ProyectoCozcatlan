import Producto from "../models/product.js";
import {v2 as clodinary} from "cloudinary";

const productsController = {}

//SELECT de productos :O
productsController.getProducts = async (req, res) => {
    try {
        const products = await Producto.find();
        return res.status(200).json(products);
    }catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal Server Error"});
    }
}

// INSERT de productos :O
productsController.createProduct = async (req, res) => {
    try {
        const { name, category, price, stock, description, supplier_id }=req.body;

        const newProduct = new Producto({
            name,
            category,
            price,
            stock,
            description,
            supplier_id,
            images: req.files.map(file => ({
                image: file.path, 
                public_id: file.filename
            }))
        });

        await newProduct.save();
        return res.status(200).json({ message: "Product created successfully" });
        
    } catch (error) {
        console.log("error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// SELECT by id
productsController.getProductById = async (req, res) => {
    try {
        const product = await Producto.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.log("error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

//DELETE de productos :O
productsController.deleteProduct = async (req, res) => {
    try {
        const productFound = await Producto.findById(req.params.id);

        if (!productFound) {
            return res.status(404).json({message: "Product not found"});
        }

        for (const img of productFound.images) {
            await clodinary.uploader.destroy(img.public_id);
        }

        await Producto.findByIdAndDelete(req.params.id);

        return res.status(200).json({message: "Product deleted successfully"});

    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal Server Error"});
    }
};

//UPDATE de productos :O
productsController.updateProduct = async (req, res) => {
    try {
        const {name, category, price, stock, description, supplier_id} = req.body;
        const product = await Producto.findById(req.params.id);

        const updatedData = {
            name, category, price, stock, description, supplier_id
        }

        if (req.files && req.files.length > 0) {
            for (const img of product.images) {
                await clodinary.uploader.destroy(img.public_id);
            }
            updatedData.images = req.files.map(file => ({
                image: file.path,
                public_id: file.filename
            }));
        }

        await Producto.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {new: true});
            return res.status(200).json({message: "Product updated successfully"});
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export default productsController;