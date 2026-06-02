import app from "./app.js";  // Se importa el archivo app.js
 
import "./database.js"; // Se importa el archivo database.js
 
// Se crea la función que se encarga de ejecutar el servidor
async function main() {
    app.listen(4000)
    console.log("Server on port 4000")
};
 
main();