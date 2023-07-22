import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import router from './routers/canticles.router'

const PORT = process.env.PORT ?? 3001
const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())

app.use(router)

app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`))

/* import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import db from "./config/mongo";
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
db().then(() => console.log("Conexion Ready"));
app.listen(PORT, () => console.log(`Listo por el puerto ${PORT}`)); */
