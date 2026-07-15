import salesModel from '../models/sales.js';
import "../models/order.js";
import "../models/client.js";


const salesController = {};

salesController.getSales = async(req, res) => {
    try{
        const sales = await salesModel.find()
        .populate({
            path: "order_id",
            select: "client_id total",
            populate: {
                path: "client_id",
                select: "firstName lastName first_name last_name",
            },
        })
        .sort({ purchase_date: -1 });

        return res.status(200).json(sales)
    }catch(error){
        console.log("error: ", error);
        return res.status(500).json({message: "Internal GET Server Error"})
    }
};

salesController.insertSales = async(req, res) => {
    try{
        const {
            order_id,
            delivery_address
        } = req.body;

        const newSale = new salesModel({
            order_id,
            delivery_address
        })

        await newSale.save();
        return res.status(201).json({ message: "Sale created successfully" });

    }catch(error){
        console.log("error: ", error);
        return res.status(500).json({message: "Internal INSERT Server Error"})
    }
}

salesController.updateSaleStatus = async(req, res) => {
    try{
        const {
            payment_status,
            delivery_status
        } = req.body;

        // Objeto para almacenar campos que vienen en el body
        const updatedFields = {};

        //Si no se define un campo, se deja como esta
        if (payment_status !== undefined) updatedFields.payment_status = payment_status;
        if (delivery_status !== undefined) updatedFields.delivery_status = delivery_status;

        const sale = await salesModel.findById(req.params.id)

        if(!sale){
            return res.status(404).json({message: "Sale Not Found"})
        }

        await salesModel.findByIdAndUpdate(req.params.id, 
            updatedFields, 
            {new: true});

         return res.status(200).json({message: "Sale Status updated successfully"});
    }catch(error){
        console.log("error: ", error);
        return res.status(500).json({message: "Internal UPDATE Server Error"})
    }
};

salesController.deleteSale = async(req, res) => {
    try{
        const deletedSale = await salesModel.findByIdAndDelete(req.params.id);

        if(!deletedSale){
            return res.status(404).json({message: "Sale Not Found"})
        }

        return res.status(200).json({message: "Sale deleted successfully"});
    }catch(error){
        console.log("error: ", error);
        return res.status(500).json({message: "Internal DELETE Server Error"})
    }
};

export default salesController;