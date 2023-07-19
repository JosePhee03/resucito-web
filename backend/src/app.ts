import 'dotenv/config'
import express from 'express'
import canticles from './RESUCITO/ES/v6/2014.json' assert { type: 'json' }
import cors from 'cors'

const QUERY_PARAMS = {
  SKIP: 'skip',
  LIMIT: 'limit',
  SEARCH: 'q'
}

const STAGE = [
  'precatechumenate',
  'catechumenate',
  'liturgy',
  'election'
]

const PORT = process.env.PORT ?? 3001
const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())

app.get('/', async (req, res) => {
  const queryParams = req.query

  let limit = 10
  let skip = 0
  const newCanticles: any[] = []

  for (const [key, value] of Object.entries(queryParams)) {
    if (Object.values(QUERY_PARAMS).includes(key)) {
      if (value === undefined || value === '') continue
      if (key === QUERY_PARAMS.SKIP) skip = +value
      if (key === QUERY_PARAMS.LIMIT) limit = +value
      continue
    }
  }

  canticles.forEach((canticle, index) => {
    if (index >= limit + skip) return

    const canticleValid = index >= skip
    if (canticleValid) {
      newCanticles.push(canticle)
    }
  })

  res.send({
    canticles: newCanticles,
    total: newCanticles.length,
    limit,
    skip
  })
})

app.get('/search', async (req, res) => {
  const queryParams = req.query
  console.log(queryParams)

  let limit = 10
  let skip = 0
  let search = ''
  const newCanticles: any[] = []

  for (const [key, value] of Object.entries(queryParams)) {
    if (Object.values(QUERY_PARAMS).includes(key)) {
      if (value === undefined || value === '') continue
      if (key === QUERY_PARAMS.SKIP) skip = +value
      if (key === QUERY_PARAMS.LIMIT) limit = +value
      if (key === QUERY_PARAMS.SEARCH) search = value.toString()
      continue
    }
  }

  const filterCanticles = search === ''
    ? canticles
    : canticles.filter(canticle => {
      if (canticle.lyric.split(' ').some((letter) => new RegExp(search).test(letter))) {
        return true
      } else return false
    })

  filterCanticles.forEach((canticle, index) => {
    if (index >= limit + skip) return

    const canticleValid = index >= skip
    if (canticleValid) {
      newCanticles.push(canticle)
    }
  })

  res.send({
    canticles: newCanticles,
    total: filterCanticles.length,
    limit,
    skip
  })
})

app.get('/:page', async (req, res) => {
  const numPage = req.params.page

  const newCanticle = canticles.find((_, index) => index === +numPage)

  if (newCanticle === undefined) {
    res.send('Canto no encontrado')
  } else {
    res.send(newCanticle)
  }
})

app.get('/stage/:stage', async (req, res) => {
  const stage = req.params.stage

  if (STAGE.includes(stage)) {
    const newCanticles = canticles.filter(canticle => stage === canticle.stage)
    return res.send({ canticles: newCanticles, length: newCanticles.length })
  } else return res.send('Stage no encontrado')
})

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
