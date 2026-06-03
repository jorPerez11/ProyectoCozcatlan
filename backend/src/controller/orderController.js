import orderModel from "../models/order.js";
import productsModel from "../models/product.js";

// Array de funciones
const orderController = {};

// SELECT
orderController.getOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("client_id", "first_name last_name email")
      .populate("products.product_id", "name price");

    return res.status(200).json(orders);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// SELECT by id
orderController.getOrderById = async (req, res) => {
  try {
    const order = await orderModel
      .findById(req.params.id)
      .populate("client_id", "first_name last_name email")
      .populate("products.product_id", "name price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// INSERT
orderController.insertOrder = async (req, res) => {
  try {
    const { products, client_id } = req.body;

    // Variable para guardar el total
    let total = 0;

    // Nuevo arreglo de productos
    let newProducts = [];

    // De todos los productos que me envíe el frontend los voy a recorrer uno por uno
    for (let i = 0; i < products.length; i++) {
      // Buscar el producto en la base de datos
      const productFound = await productsModel.findById(products[i].product_id);

      // Calcular el subtotal
      const sub_total = productFound.price * products[i].amount;

      // Calcular el total
      total += sub_total;

      // Guardamos el producto junto con su subtotal
      newProducts.push({
        product_id: products[i].product_id,
        amount: products[i].amount,
        sub_total: sub_total,
      });
    }

    // Llenamos el modelo
    const newOrder = new orderModel({
      client_id,
      products: newProducts,
      total
    });

    // Guardamos todo en la base de datos
    await newOrder.save();

    return res.status(200).json({ message: "Order created" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE
orderController.updateOrder = async (req, res) => {
  try {
    // Solicitamos los nuevos datos
    const { products, client_id } = req.body;

    // variable total
    let total = 0;

    // Arreglo de productos
    let newProducts = [];

    // Recorrer los productos
    for (let i = 0; i < products.length; i++) {
      // Buscar producto
      const productFound = await productsModel.findById(products[i].product_id);

      // Calcuñar el subtotal
      const sub_total = productFound.price * products[i].amount;

      // Suma total
      total += sub_total;

      // Agregamos el producto al arreglo
      newProducts.push({
        product_id: products[i].product_id,
        amount: products[i].amount,
        sub_total: sub_total,
      });
    }

    // Actualizo el carrito en la base de datos
    const updatedOrder = await orderModel.findByIdAndUpdate(
      req.params.id,
      {
        client_id,
        products: newProducts,
        total
      },
      { new: true },
    );

    if(!updatedOrder){
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order updated" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE
orderController.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await orderModel.findByIdAndDelete(req.params.id);

    // Validación
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default orderController;