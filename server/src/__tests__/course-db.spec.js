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
      const course = { id: 'rick', title: 'morty', tags:'java,python' }
      await subject.upsert(course)

      const result = await subject.get(course.id)

      expect(result).toEqual(course)
    })
  })

  describe('#upsert', () => {
    it('updates existing course data - 1 component(title)', async () => {
      const course = { id: 'homer', title: 'simpson', tags:'node' }
      await subject.upsert(course)
      course.title = 'guy incognito'

      await subject.upsert(course)
      const result = await subject.get(course.id)

      expect(result).toEqual(course)
    })
    it('updates existing course data - 1 component(tags)', async () => {
      const course = { id: 'Veto', title: 'Corleone', tags:'Mafia' }
      await subject.upsert(course)
      course.tags = 'ultimate mafia'

      await subject.upsert(course)
      const result = await subject.get(course.id)

      expect(result).toEqual(course)
    })
    it('updates existing course data - 2 component', async () => {
      const course = { id: 'Virat', title: 'Kohli', tags:'Cricketer' }
      await subject.upsert(course)
      course.title = 'great'
      course.tags = 'batsman'

      await subject.upsert(course)
      const result = await subject.get(course.id)
      //console.log(result)
      //console.log(course.timestamp)
      expect(result).toEqual(course)
    })
  })
  describe('#check cache entries', () => {
    it('check a day old file', async () => {
      
      const statement = `
      insert or replace into courses (id, title, tags, timestamp)
      values ('Paine', 'Dash', 'Amazing-Scoob,Wallstreet', DATETIME('NOW', '-24 hours'));`

      db.execute(statement)
      const result = await subject.get('Paine')
      //console.log(result)
      
      expect(result).toEqual(undefined)
    })
    it('check 23 hours old file', async () => {
      
      const statement = `
      insert or replace into courses (id, title, tags, timestamp)
      values ('Crane', 'Scholastic', 'Book-Reader', DATETIME('NOW', '-23 hours'));`

      db.execute(statement)
      const result = await subject.get('Crane')
      //console.log(result)
      
      expect(result).toEqual({id: 'Crane', title: 'Scholastic', tags:'Book-Reader'})
    })
  })

})
