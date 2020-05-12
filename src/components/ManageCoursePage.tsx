import React, { useState } from "react";
import { Prompt } from "react-router-dom";
import CourseForm from "./CourseForm";
import * as courseApi from "../api/courseApi";

const ManageCoursePage = (props: any) => {
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  // function handleChange(event: any) {
  //   const updatedCourse = {
  //     ...course,
  //     [event.target.name]: event.target.value,
  //   };
  //   setCourse(updatedCourse);
  // }

  //destructured
  function handleChange({ target }: any) {
    setCourse({
      ...course,
      [target.name]: target.value,
    });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    courseApi.saveCourse(course).then(() => {
      props.history.push("/courses");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <Prompt when={true} message="Are your sure you want to leave?" />
      {props.match.params.slug}
      <CourseForm
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
