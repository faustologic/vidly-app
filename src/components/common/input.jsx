import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  // we can use the rest operator to clean our code... also, anytime we want to add a new component for our input component it can be added just once and the the ...rest operator it'll add it
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name} name={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
