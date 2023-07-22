import mongoose from 'mongoose'
import 'dotenv/config'

const CONFIG = {
  MONGODB_URI: process.env.MONGODB_URI as string,
  PORT: process.env.PORT
}

mongoose.connect(CONFIG.MONGODB_URI)
  .then(() => console.log('conectado a mongodb'))
  .catch(e => console.log('error de conexión', e.message))
