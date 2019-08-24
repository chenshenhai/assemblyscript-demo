const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

const staticPath = './../../'

app.use(static(
  path.join( __dirname,  staticPath)
))

app.listen(3000, () => {
  console.log('[INFO]: server starting at port 3000');
  console.log('open: http://127.0.0.1:3000/example/browser/index.html')
})