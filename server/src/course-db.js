const db = require('./sqlite-wrapper')

async function createTable() {
  const statement = `
    create table if not exists courses (
      id text primary key,
      title text not null,
      tags text not null
    );`

  return db.execute(statement)
}

async function get(courseId) {
  return db.get('select id, title, tags from courses where id = $id;', { $id: courseId })
}

async function upsert(course) {
  const statement = `
    insert or replace into courses (id, title, tags)
    values ($id, $title, $tags)`

  return db.execute(statement, { $id: course.id, $title: course.title, $tags: course.tags })
}

module.exports = {
  createTable,
  get,
  upsert
}
