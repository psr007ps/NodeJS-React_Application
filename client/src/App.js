import React from "react"
import Theme from '@pluralsight/ps-design-system-theme'
import CircularProgress from '@pluralsight/ps-design-system-circularprogress'
import "./App.css"

const url = window.location.href
const lastPart = url.substr(url.lastIndexOf('/') + 1)
console.log(lastPart)
let urlToFetch = 'http://localhost:5000/courses'
if (lastPart)
  urlToFetch += '/' + lastPart
else
  urlToFetch += '/1'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      course: null
    }
  }
  componentDidMount() {
    fetch(urlToFetch)
      .then(res => res.json())
      .then(course => this.setState({ course: course }))
  }
  render() {
    return (
      <Theme name={Theme.names.dark}>
          {this.state.course ? (
            <ul className="course">
              <li><strong>ID:</strong> {this.state.course.id}</li>
              <li><strong>Title:</strong> {this.state.course.title}</li>
            </ul>
          ) : (
            <CircularProgress className="loading" size={CircularProgress.sizes.small}/>
          )}
      </Theme>
    )
  }
}
