import mongoose from "mongoose";
import {config} from "./config.js"
import { setServers } from "dns";

setServers(["8.8.8.8", "8.8.4.4"]);

//Cadena de conexión hacia MongoDB
mongoose.connect(config.db.URI);
 
//Creamos una constante para ver si realmente nos conectamos a MongoDB
const connection = mongoose.connection;
 
//Por si se conecta, saberlo
connection.once("open", ()=>{
    console.log("Connection to the database successful")
})
 
//Por si NO se conecta
connection.on("disconnected", (error)=>{
    console.log("Unable to connect to the database" + error)
})
 
//Cuando da error
connection.on("error", (error)=>{
    console.log("Connection to the database could not be established" + error)
})