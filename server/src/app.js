const express = require('express')
const cors = require('cors')

const courseCache = require('./course-cache')

function notFound(req, res, next) {
  next(new Error(`There's nothing here at '${req.url}'`))
}

function logErrors(err, req, res, next) {
  console.error(err)
  next(err)
}

function catchAll(err, req, res) {
  const status = err.status || 500
  res.status(status).json(res.failureWithError(err))
}

function wrapAsyncRoute(asyncRoute) {
  return function routeWrapper(req, res, next) {
    return asyncRoute(req, res, next).catch(next)
  }
}

async function getCourse(req, res) {
  const data = await courseCache.get(req.params.id)
  if (data) {
    res.status(200).send(data)
  } else {
    res.sendStatus(404)
  }
}

module.exports = () => {
  const app = express()

  app.use(cors())

  app.get('/courses/:id', wrapAsyncRoute(getCourse))

  app.use(notFound)
  app.use(logErrors)
  app.use(catchAll)

  return app
}
