const subject = require('../course-db')
const db = require('../sqlite-wrapper')

describe('course-db', () => {
  beforeAll(async () => {
    await db.connect(':memory:')
    return subject.createTable()
  })
  afterAll(() => {
    return db.close()
  })

  describe('#get', () => {
    it('gets the course from the repo', async () => {
      const course = { id: 'rick', title: 'morty' }
      await subject.upsert(course)

      const result = await subject.get(course.id)

      expect(result).toEqual(course)
    })
  })

  describe('#upsert', () => {
    it('updates existing course data', async () => {
      const course = { id: 'homer', title: 'simpson' }
      await subject.upsert(course)
      course.title = 'guy incognito'

      await subject.upsert(course)
      const result = await subject.get(course.id)

      expect(result).toEqual(course)
    })
  })
})
