const authResolver = require('./resolvers/auth')
const eventResolver = require('./resolvers/event')
const bookingResolver = require('./resolvers/booking')

const rootResolver = {
  ...authResolver,
  ...bookingResolver,
  ...eventResolver
}
module.exports = rootResolver