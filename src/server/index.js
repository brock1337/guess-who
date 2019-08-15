import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import logger from 'koa-logger'
import config from '../config'
import router from '../routes'
import patientRouter from '../routes/patients'

const app = new Koa()
const PORT = config.get('port') || process.env.PORT

// Logger
app.use(logger())

// CORS
app.use(cors({
  origin: '*'
}))

// Body
app.use(bodyParser({
  enableTypes: ['json']
}))

// Routers
app.use(router.routes())
app.use(router.allowedMethods())

app.use(patientRouter.routes())
app.use(patientRouter.allowedMethods())

// Server
app.listen(PORT, () => {
  console.log(`Server listening on PORT --> ${PORT}`)
})