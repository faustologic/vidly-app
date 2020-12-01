import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  // we can use the rest operator to clean our code...
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name} name={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
