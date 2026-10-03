const logoutController = {};

logoutController.logout = async (req, res) => {
  // Limpiar la cookie que tiene la información de quien inició sesión
  res.clearCookie("authCookie", { httpOnly: true, secure: true, sameSite: "none" });

  return res.status(200).json({ message: "Sesión cerrada" });
};

export default logoutController;