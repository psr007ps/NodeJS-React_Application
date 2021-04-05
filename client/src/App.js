import React from "react"
import Theme from '@pluralsight/ps-design-system-theme'
import CircularProgress from '@pluralsight/ps-design-system-circularprogress'
import "./App.css"

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      course: null
    }
  }
  componentDidMount() {
    fetch('http://localhost:5000/courses/1')
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
