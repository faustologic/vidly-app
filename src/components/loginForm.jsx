import React from "react";
import Joi from "joi-browser"; // We installed Joi like: npm i joi-browser@13.4
import Form from "./common/form"; //reusable component

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  // the schema it's not goint to change, so that`s why we don't put it on the state objects.
  // The schema it's not reusable.
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    //Call the server
    console.log("Submitted");
  };

  render() {
    return (
      <div>
        <h1 className="loginForm__title">Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {/* <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton()}
        </form>
      </div>
    );
  }
}

export default LoginForm;
