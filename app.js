
import express, { response } from 'express';
import dotenv from "dotenv"; 
import schoolRoutes from "./routes/schoolRoute.js"

dotenv.config();


const app = express();
app.use(express.json());

const ORS_API_KEY = process.env.ORS_API_KEY
app.use('/',schoolRoutes)

//STARTING SERVER
app.listen(8080, () => {
    console.log("server is listening at port 8080:");

});