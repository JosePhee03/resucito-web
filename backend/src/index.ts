import config from './config'
import mongoose from 'mongoose'

mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('conectado a mongodb'))
  .catch(e => console.log('error de conexión', e.message))
