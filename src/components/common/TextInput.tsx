import React from "react";
import PropTypes, { InferProps } from "prop-types";

function TextInput(props: TextInputProps) {
  let wrapperClass = "form-group";
  if (props.error && props.error.length > 0) {
    wrapperClass += " has-error";
  }
  return (
    <div className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <div className="field">
        <input
          id={props.id}
          type="text"
          onChange={props.onChange}
          name={props.name}
          className="form-control"
          value={props.value || ""}
        />
      </div>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
}

const TextInputPropType = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
};

type TextInputProps = InferProps<typeof TextInputPropType>;

TextInput.defaultProps = {
  error: "",
};

export default TextInput;
