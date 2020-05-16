import React, { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";
import CourseForm from "./CourseForm";
//import * as courseApi from "../api/courseApi";
import courseStore from "../stores/couseStore";
import { toast } from "react-toastify";
import * as courseActions from "../actions/courseActions";

const ManageCoursePage = (props: any) => {
  const [errors, setErrors] = useState({});

  //store course in array of courses
  const [courses, setCourses] = useState(courseStore.getCourses());

  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: "",
    category: "",
  });

  useEffect(() => {
    courseStore.addChangeListener(onChange); //run onChange function when the Flux store changes
    const slug = props.match.params.slug; // from the path `/courses/:slug`
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChangeListener(onChange); //cleanup
  }, [courses.length, props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

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

  function formIsValid() {
    const _errors: errorType = {
      title: "",
      authorId: "",
      category: "",
    };

    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);
    //Form is valid if object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event: any) {
    event.preventDefault();

    if (!formIsValid()) return;

    courseActions.saveCouse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course Saved");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <Prompt when={true} message="Are your sure you want to leave?" />
      {props.match.params.slug}
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

interface errorType {
  title: string;
  authorId: string;
  category: string;
}

interface courseType {
  title: string;
  authorId: string;
  category: string;
}

export default ManageCoursePage;
