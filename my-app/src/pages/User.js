import React from "react";
import { connect } from "react-redux";
import { user } from "../store/actions/authActions";

class User extends React.Component {
  state = {
    name: "",
    email: "",
    hobby: "",
    gender: "",
    error: {}
  };

 static getDerivedStateFromProps(nextProps, prevState) {
    if (
      JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)
    ) {
      return {
        error: nextProps.auth.error
      };
    }
    return null;
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitHandler = event => {
    event.preventDefault();
    let { name, email, hobby, gender } = this.state;
    this.props.user(
      { name, email, hobby, gender },
      this.props.history
    );
  };

  render() {
    let { name, email, hobby, gender, error } = this.state;
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center display-4">User Information</h1>
          <form onSubmit={this.submitHandler}>
            <div className="form-group">
              <label htmlFor="name"> Name: </label>
              <input
                type="text"
                className={
                  error.name ? "form-control is-invalid" : "form-control"
                }
                placeholder="Enter Your Name"
                name="name"
                id="name"
                value={name}
                onChange={this.changeHandler}
              />
              {error.name && (
                <div className="invalid-feedback">{error.name}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email"> Email: </label>
              <input
                type="email"
                className={
                  error.email ? "form-control is-invalid" : "form-control"
                }
                placeholder="Enter Your Email"
                name="email"
                id="email"
                value={email}
                onChange={this.changeHandler}
              />
              {error.email && (
                <div className="invalid-feedback">{error.email}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password"> Hobby: </label>
              <input
                type="text"
                className={
                  error.hobby ? "form-control is-invalid" : "form-control"
                }
                placeholder="Enter Your Hobby"
                name="hobby"
                id="hobby"
                value={hobby}
                onChange={this.changeHandler}
              />
              {error.hobby && (
                <div className="invalid-feedback">{error.hobby}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword"> Gender: </label>
              <input
                type="text"
                className={
                  error.gender
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Confirm Your Gender"
                name="gender"
                id="gender"
                value={gender}
                onChange={this.changeHandler}
              />
              {error.gender && (
                <div className="invalid-feedback">{error.gender}</div>
              )}
            </div>
            <button className="btn btn-primary my-3 d-block">Create</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { user }
)(User);
