import Router from 'koa-router'

const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = 'Guess Who? -> Hi There Stranger!'
})

export default router