const db = require('./sqlite-wrapper')

async function clearCacheOlderThanOneDay(){
  const statement = `DELETE FROM courses WHERE timestamp <= DATETIME('NOW', '-24 hours');`
  db.execute(statement)
}

async function createTable() {
  const statement = `
    create table if not exists courses (
      id text primary key,
      title text not null,
      tags text not null,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
    );`

  return db.execute(statement)
}

async function get(courseId) {
  await clearCacheOlderThanOneDay()
  return db.get('select id, title, tags from courses where id = $id;', { $id: courseId })
}

async function upsert(course) {
  const statement = `
    insert or replace into courses (id, title, tags, timestamp)
    values ($id, $title, $tags, CURRENT_TIMESTAMP);`

  return db.execute(statement, { $id: course.id, $title: course.title, $tags: course.tags })
}

module.exports = {
  clearCacheOlderThanOneDay,
  createTable,
  get,
  upsert
}
