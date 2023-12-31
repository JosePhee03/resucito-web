import 'dotenv/config'
import express from 'express'
import { join } from 'path'
import cors from 'cors'
import router from './routers/canticles.router'

const PORT = process.env.PORT ?? 3001
const app = express()

const staticFolderPath = join(__dirname, '../../frontend/dist')

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.static(staticFolderPath))

app.get('/', (_, res) => {
  res.sendFile(join(staticFolderPath, 'index.html'))
})

app.use(router)

app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`))
