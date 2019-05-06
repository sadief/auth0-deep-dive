import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Playgrounds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playgrounds: null
    };
  }

  async componentDidMount() {
    const playgrounds = (await axios.get("http://localhost:8081/")).data;
    this.setState({
      playgrounds
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Link to="/new-playground">
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header">Need to add a new Playground?</div>
              <div className="card-body">
                <h4 className="card-title">+ New Playground</h4>
                <p className="card-text">Don't worry. Help is on the way!</p>
              </div>
            </div>
          </Link>
          {this.state.playgrounds === null && <p>Loading playgrounds...</p>}
          {this.state.playgrounds &&
            this.state.playgrounds.map(playground => (
              <div key={playground.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`playground/${playground.id}`}>
                  <div className="card text-white bg-secondary mb-3">
                    <div className="card-header">Notes: {playground.notes}</div>
                    <div className="card-body">
                      <h4 className="card-title">{playground.name}</h4>
                      <p className="card-text">{playground.location}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Playgrounds;
