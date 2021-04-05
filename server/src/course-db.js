const db = require('./sqlite-wrapper')

async function createTable() {
  const statement = `
    create table if not exists courses (
      id text primary key,
      title text not null
    );`

  return db.execute(statement)
}

async function get(courseId) {
  return db.get('select id, title from courses where id = $id;', { $id: courseId })
}

async function upsert(course) {
  const statement = `
    insert into courses (id, title)
    values ($id, $title)
    on conflict(id) do update set title = $title;`

  return db.execute(statement, { $id: course.id, $title: course.title })
}

module.exports = {
  createTable,
  get,
  upsert
}
