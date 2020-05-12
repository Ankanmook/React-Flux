import React from "react";
import PropTypes, { InferProps } from "prop-types";

function CourseList(props: CourseListProps) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author Id</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {props.courses.map((course: any) => {
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
  );
}

const CourseListPropType = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

type CourseListProps = InferProps<typeof CourseListPropType>;

// CourseList.propType = {
//   courses: PropTypes.array.isRequired,
// };

export default CourseList;
