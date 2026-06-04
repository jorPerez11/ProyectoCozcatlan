import Suppliers from "../models/suppliers.js";

const suppliersController = {}

//SELECT de proveedores :O
suppliersController.getSupplier = async (req, res) => {
    try {
        const suppliers = await Suppliers.find();
        return res.status(200).json(suppliers);
    }catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal Server Error"});
    }
}

// INSERT de proveedores wow :O
suppliersController.createSupplier = async (req, res) => {
    try {
        const { suppliers_name, type_supplier, phone, email, address, status } = req.body;

        const newSupplier = new Suppliers({
            suppliers_name,
            type_supplier,
            phone,
            email,
            address,
            status
        });

        await newSupplier.save();
        return res.status(200).json({ message: "Supplier created successfully" });
        
    } catch (error) {
        console.log("error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

//DELETE de suppliers :O
suppliersController.deleteSupplier = async (req, res) => {
    try {
        const supplierFound = await Suppliers.findById(req.params.id);

        if (!supplierFound) {
            return res.status(404).json({message: "Supplier not found"});
        }

        const supplierDeleted = await Suppliers.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Suppler deleted successfully"});

    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal Server Error"});
    }
};

//UPDATE de suppliers :O
suppliersController.updateSupplier = async (req, res) => {
    try {
        const { suppliers_name, type_supplier, phone, email, address, status } = req.body;
        const supplier = await Suppliers.findById(req.params.id);

        if (!supplier) {
            return res.status(404).json({message: "Supplier not found"});
        }

        const updatedData = {
            suppliers_name, type_supplier, phone, email, address, status
        }

        await Suppliers.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {new: true});
            return res.status(200).json({message: "Supplier updated successfully"});
    } catch (error) {
        console.log("error:", error)
        return res.status(500).json({message: "Internal Server Error"});
    }
};

export default suppliersController;