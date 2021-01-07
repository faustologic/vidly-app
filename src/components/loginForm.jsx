import React from "react";
import Joi from "joi-browser"; // We installed Joi like: npm i joi-browser@13.4
import Form from "./common/form"; //reusable component
import auth from "../services/authService";
import { toast } from "react-toastify";

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

  doSubmit = async () => {
    try {
      const { data } = this.state;
      // jwt = Json web token
      await auth.login(data.username, data.password);

      window.location = "/";
      toast.success("Welcome back " + data.username); //fix the problem
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1 className="loginForm__title">Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
