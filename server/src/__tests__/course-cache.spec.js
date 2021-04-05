const courseDb = require('../course-db')
const courseApi = require('../course-api')
const subject = require('../course-cache')

jest.mock('../course-db')
jest.mock('../course-api')

describe('course-cache', () => {
  beforeEach(() => {
    courseDb.get.mockReset()
    courseDb.upsert.mockReset()
    courseApi.get.mockReset()
  })

  describe('#get', () => {
    it('gets data from the db', async () => {
      const course = { id: 'such', title: 'test' }
      courseDb.get.mockResolvedValue(course)

      const result = await subject.get(course.id)

      expect(result).toEqual(course)
      expect(courseDb.get).toHaveBeenCalledWith(course.id)

      expect(courseDb.upsert).not.toBeCalled()
      expect(courseApi.get).not.toBeCalled()
    })

    describe('when course is not cached', () => {
      describe('when the source of truth returns a value', () => {
        it('gets and saves the course', async () => {
          const course = { id: 'very', title: 'mock' }
          courseDb.get.mockResolvedValue(null)
          courseApi.get.mockResolvedValue(course)

          const result = await subject.get(course.id)

          expect(result).toEqual(course)
          expect(courseApi.get).toHaveBeenCalledWith(course.id)
          expect(courseDb.upsert).toHaveBeenCalledWith(course)
        })
      })

      describe('when the source of truth does not return a value', () => {
        it('does not attempt to save', async () => {
          const courseId = '5'

          courseDb.get.mockResolvedValue(null)
          courseApi.get.mockResolvedValue(null)

          const result = await subject.get(courseId)

          expect(result).toEqual(null)
          expect(courseDb.get).toHaveBeenCalledWith(courseId)
          expect(courseApi.get).toHaveBeenCalledWith(courseId)

          expect(courseDb.upsert).not.toBeCalled()
        })
      })
    })
  })
})
