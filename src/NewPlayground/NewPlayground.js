import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import auth0Client from "../Auth";
import axios from "axios";

class NewPlayground extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      name: "",
      location: ""
    };
  }

  updateLocation(value) {
    this.setState({
      location: value
    });
  }

  updateName(value) {
    this.setState({
      name: value
    });
  }

  async submit() {
    this.setState({
      disabled: true
    });

    await axios.post(
      "http://localhost:8081",
      {
        name: this.state.name,
        location: this.state.location
      },
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      }
    );

    this.props.history.push("/");
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">New Playground</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Name:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={e => {
                      this.updateName(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Name of Playground"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Location:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={e => {
                      this.updateLocation(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Location of Playground"
                  />
                </div>
                <button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={() => {
                    this.submit();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NewPlayground);
