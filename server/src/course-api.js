const axios = require('axios')

async function get(courseId) {
  try {
    const res = await axios.get(`https://ep-coding-challenge-us-west-2.s3-us-west-2.amazonaws.com/courses/${courseId}`)

    return { id: courseId, title: res.data.title }
  } catch (err) {
    return null
  }
}

module.exports = {
  get
}
