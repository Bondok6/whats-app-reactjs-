import React, { Component } from "react";
import Input from "../Input/Input";
import { updatedObject, checkValidity } from "../../utils/shared";
import * as actions from "../../store/index";
import { connect } from "react-redux";
import "./SignUp.css";

class SignUp extends Component {
  state = {
    controls: {
      username: {
        value: "",
        valid: false,
        validation: {
          required: true,
          minLength: 6,
          maxLength: 12,
        },
        elementType: "input",
        elementConfig: {
          type: "username",
          placeholder: "Username",
        },
        touched: false,
      },
      email: {
        value: "",
        valid: false,
        validation: {
          required: true,
          isEmail: true,
        },
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        touched: false,
      },
      password: {
        value: "",
        valid: false,
        validation: {
          required: true,
          maxLength: 6,
        },
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        touched: false,
      },
    },
    photo: null,
  };

  on(event, elementName) {
    const updated = updatedObject(this.state.controls, {
      [elementName]: updatedObject(this.state.controls[elementName], {
        valid: checkValidity(
          event.target.value,
          this.state.controls[elementName].validation
        ),
        value: event.target.value,
        touched: true,
      }),
    });
    this.setState({ controls: updated });
  }
  submit = (e) => {
    e.preventDefault();
    this.props.signUp(
      this.state.photo,
      this.state.controls.username.value,
      this.state.controls.email.value,
      this.state.controls.password.value
    );
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementsArray.map((element) => (
      <Input
        key={element.id}
        changed={(e) => this.on(e, element.id)}
        inValid={!element.config.valid}
        value={element.config.value}
        elementType={element.config.elementType}
        hasValidity
        touched={element.config.touched}
        elementConfig={element.config.elementConfig}
      />
    ));

    return (
      <>
        <div className="text-center">
          <div className="container">
            <div className="row m-5 m-5 m-5">
              <div className="col-4"></div>
              <form className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
                <img
                  id="img"
                  alt="ss"
                  style={{ borderRadius: "50%", width: "62px", height: "55px" }}
                  className="hidden"
                />
                <input
                  id="phoo"
                  type="file"
                  onChange={(event) => {
                    if (event.target.files[0]) {
                      this.setState({ photo: event.target.files[0] });
                      var selectedFile = event.target.files[0];
                      var reader = new FileReader();
                      var imgtag = document.getElementById("img");
                      imgtag.classList.remove("hidden");
                      imgtag.title = selectedFile.name;
                      reader.onload = function (event) {
                        imgtag.src = event.target.result;
                      };
                      reader.readAsDataURL(selectedFile);
                    }
                  }}
                />
                {form}

                <button
                  className="btn btn-lg btn-primary btn-block mt-3"
                  type="submit"
                  onClick={this.submit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (photo, name, email, password) =>
      dispatch(actions.authSignUp(photo, name, email, password)),
    message: (photo) => dispatch(actions.message(photo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
