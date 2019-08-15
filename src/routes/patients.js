import Router from 'koa-router'
import PatientController from '../controllers/PatientController'

const patientRouter = new Router({
  prefix: '/patient'
})

const patientController = new PatientController()

patientRouter.get('/', async (ctx, next) => {
  ctx.body = 'Patient Safe Harbor - Base Route'
})

patientRouter.get('/safe', async (ctx, next) => {
  await patientController.deIdentifyPatient(ctx, next)
})

export default patientRouter
