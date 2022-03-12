const app = require('./app') // the actual Express application
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})