import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import auth0Client from "../../Auth";

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: ""
    };
  }

  updateNote(value) {
    this.setState({
      note: value
    });
  }

  submit() {
    this.props.addNote(this.state.note);

    this.setState({
      note: ""
    });
  }

  render() {
    if (!auth0Client.isAuthenticated()) return null;
    return (
      <Fragment>
        <div className="form-group text-center">
          <label htmlFor="exampleInputEmail1">Note:</label>
          <input
            type="text"
            onChange={e => {
              this.updateNote(e.target.value);
            }}
            className="form-control"
            placeholder="Update note"
            value={this.state.note}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            this.submit();
          }}
        >
          Submit
        </button>
        <hr className="my-4" />
      </Fragment>
    );
  }
}

export default withRouter(AddNote);
