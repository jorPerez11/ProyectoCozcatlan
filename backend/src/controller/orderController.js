import orderModel from "../models/order.js";
import productsModel from "../models/product.js";
import salesModel from "../models/sales.js";
import "../models/client.js";

// Array de funciones
const orderController = {};

// SELECT historial de pedidos de un cliente (con el estado de entrega/pago si existe)
orderController.getOrdersByClient = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ client_id: req.params.clientId })
      .populate("products.product_id", "name price images")
      .sort({ createdAt: -1 });

    const orderIds = orders.map((order) => order._id);
    const sales = await salesModel.find({ order_id: { $in: orderIds } });
    const saleByOrderId = new Map(sales.map((sale) => [String(sale.order_id), sale]));

    const history = orders.map((order) => {
      const sale = saleByOrderId.get(String(order._id));

      return {
        _id: order._id,
        products: order.products,
        total: order.total,
        createdAt: order.createdAt,
        delivery_status: sale?.delivery_status || "Pendiente",
        payment_status: sale?.payment_status || "Pendiente",
        delivery_address: sale?.delivery_address || null,
      };
    });

    return res.status(200).json(history);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// SELECT
orderController.getOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("client_id", "firstName lastName first_name last_name email")
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
      .populate("client_id", "firstName lastName first_name last_name email")
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

      // Calcular el subtotal (redondeado a centavos para evitar errores de coma flotante)
      const sub_total = Math.round(productFound.price * products[i].amount * 100) / 100;

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
      total: Math.round(total * 100) / 100,
    });

    // Guardamos todo en la base de datos
    await newOrder.save();

    // Retornamos el mensaje y el ID generado
    return res.status(200).json({ 
      message: "Order created", 
      orderId: newOrder._id // MongoDB genera el id en la propiedad _id
    });
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

      // Calcuñar el subtotal (redondeado a centavos para evitar errores de coma flotante)
      const sub_total = Math.round(productFound.price * products[i].amount * 100) / 100;

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
        total: Math.round(total * 100) / 100,
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