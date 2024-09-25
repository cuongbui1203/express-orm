import 'dotenv/config'
import express from 'express'
import db from './app/models'

const app = express()
const port = process.env.PORT || 3000

db.sequelize.sync().then(() => {
  // db.sequelize.connect
  app.listen(port, () => {
    console.log('server listening on port: ' + port)
  })
})
