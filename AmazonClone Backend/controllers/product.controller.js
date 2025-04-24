import ProductModel from "../models/product.model.js"

export const getAllProducts = async(req,res) =>{

    try{
        const products = await ProductModel.find({})
        if(!products) return res.status(400).json({ error: "Product Database Empty! "});

        res.status(200).json({ message: "Products retrived Successfully!", products: products })
    } catch (error) {
        res.status(500).json({ error: "Could not get products", details: error.message });
    }
}

export const getProduct = async(req,res) =>{

    const { id } = req.params;
    if(!id) return res.status(400).json({error : "Missing ID"});

    try{
        const product = await ProductModel.findById(id)
        if(!product) return res.status(400).json({ error: "Product Not found! "});

        res.status(200).json({ message: "Product retrived Successfully!", product: product })
    } catch (error) {
        res.status(500).json({ error: "Could not get product", details: error.message });
    }
}

export const addProduct = async (req, res) => {
    const product = req.body;
    try {
        const newProduct = await ProductModel.create(product);

        res.status(201).json({ message: "Product Added Successfully!", product: newProduct });
    } catch (error) {
        res.status(500).json({ error: "Error occurred while adding product", details: error.message });
    }
};


export const editProduct = async(req, res) =>{
    const {id} = req.params;
    if(!id) return res.status(400).json({error : "Product Not Found!"});

    const updatedData = req.body;

    try{
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedData, { new: true });
        if(!updatedProduct) return res.status(400).json({ error: "Product cant be updated! "});

        res.status(200).json({ message: "Product Updated Successfully!", product: updatedProduct })
    } catch (error) {
        res.status(500).json({ error: "Could not Update product", details: error.message });
    }

}

