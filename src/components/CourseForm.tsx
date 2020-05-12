import React from "react";
import TextInput from "./common/TextInput";
import PropTypes, { InferProps } from "prop-types";

function CourseForm(props: CourseFormProps) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="title"
        label="Title"
        onChange={props.onChange}
        name="title"
        value={props.course.title}
        error={props.errors.title}
      />

      <div className="form-group">
        <label htmlFor="author">Author</label>
        <div className="field">
          <select
            id="author"
            name="authorId"
            onChange={props.onChange}
            value={props.course.authorId || ""}
            className="form-control"
          >
            <option value="" />
            <option value="1">Cory House</option>
            <option value="2">Scott Allen</option>
          </select>
        </div>
        {props.errors.authorId && (
          <div className="alert alert-danger">{props.errors.authorId}</div>
        )}
      </div>

      <TextInput
        id="category"
        label="Category"
        onChange={props.onChange}
        name="category"
        value={props.course.category}
        error={props.errors.category}
      />
      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

const CourseFormPropType = {
  course: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string,
    authorId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    title: PropTypes.string,
    authorId: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};

type CourseFormProps = InferProps<typeof CourseFormPropType>;

export default CourseForm;
