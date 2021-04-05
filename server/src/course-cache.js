const courseDb = require('./course-db')
const courseApi = require('./course-api')

async function get(courseId) {
  const result = await courseDb.get(courseId)

  if (result)
    return result

  const course = await courseApi.get(courseId)

  if (course)
    await courseDb.upsert(course)

  return course
}

module.exports = {
  get
}
