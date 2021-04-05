import React from "react"
import Theme from '@pluralsight/ps-design-system-theme'
import CircularProgress from '@pluralsight/ps-design-system-circularprogress'
import "./App.css"
import { useState } from "react";

const url = window.location.href
const lastPart = url.substr(url.lastIndexOf('/') + 1)
console.log(lastPart)
let urlToFetch = 'http://localhost:5000/courses'
if (lastPart)
  urlToFetch += '/' + lastPart
else
  urlToFetch += '/1'

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0,0) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "..." : " ...show less"}
      </span>
    </p>
  );
};

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
              <div><strong>Tags:</strong> 
              <ReadMore>
                {this.state.course.tags.split(',').map(tag => <li key = {tag}>{tag}</li>)}
              </ReadMore></div> 
            </ul>
          ) : (
            <CircularProgress className="loading" size={CircularProgress.sizes.small}/>
          )}
      </Theme>
    )
  }
}
