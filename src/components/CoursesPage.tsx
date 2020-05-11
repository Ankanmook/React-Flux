import React from "react";
import { getCourses } from "../api/courseApi";

class CoursesPage extends React.Component {
  // constructor(props: any){
  //     super(props);

  //     this.state = {
  //         courses : []
  //     }
  // }

  state = {
    courses: [],
  };

  componentDidMount() {
    getCourses().then((courses) => this.setState({ courses: courses }));
  }

  renderRow(course: any) {
    return (
      <tr>
        <td>{course.title}</td>
        <td>{course.authorId}</td>
        <td>{course.category}</td>
      </tr>
    );
  }

  render() {
    return (
      <>
        <h2> Courses</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author Id</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {this.state.courses.map((course: any) => {
              return (
                <tr key={course.id}>
                  <td>{course.title}</td>
                  <td>{course.authorId}</td>
                  <td>{course.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default CoursesPage;
