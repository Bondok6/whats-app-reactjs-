import React, { Component } from "react";
import Input from "../../components/Input/Input";
import { updatedObject, checkValidity } from "../../utils/shared";
import * as actions from "../../store/index";
import { connect } from "react-redux";

class SignIn extends Component {
  state = {
    controls: {
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
    this.props.signIn(
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
                <h1 className="h3 mb-3 font-weight-normal">Please sign ip</h1>
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

const mapDispathToProps = (dispatch) => {
  return {
    signIn: (email, password) => dispatch(actions.authSignIn(email, password)),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(SignIn);
