import React from "react";
import PropTypes from "prop-types";

const FormSelect = (props) => {
  return (
    <select
      id={props.id || ""}
      value={props.value || ""}
      name={props.name || ""}
      onChange={props.onChange}
    >
      <option
        value=""
        disabled
      >{props.placeholder || "Select..."}
      </option>

      {props.options.map(option =>
        <option
          key={option.value}
          value={option.value}
        >
          {option.text}
        </option>
      )}
    </select>
  )
}

FormSelect.propTypes = {
  id: PropTypes.string,

  value: PropTypes.string,
  
  name: PropTypes.string,
  
  onChange: PropTypes.func,

  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,  
  })).isRequired,

  placeholder: PropTypes.string
};

export { FormSelect };
