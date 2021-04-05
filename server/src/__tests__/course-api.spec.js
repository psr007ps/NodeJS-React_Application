const axios = require('axios')

const subject = require('../course-api')

jest.mock('axios')

describe('course-api', () => {
  beforeEach(() => {
    axios.get.mockReset()
  })

  describe('#get', () => {
    it('maps the response', async () => {
      const res = { data: { title: 'course-title', description: 'amazing course' } }
      axios.get.mockResolvedValue(res)

      const course = await subject.get('34')

      expect(course).toEqual({ id: '34', title: res.data.title })
    })

    describe('on a non-200 response', () => {
      it('returns null', async () => {
        axios.get.mockRejectedValue({ status: '404' })

        const course = await subject.get('34')

        expect(course).toBeNull()
      })
    })
  })
})
