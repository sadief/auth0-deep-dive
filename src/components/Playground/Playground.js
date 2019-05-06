import React, { Component } from "react";
import axios from "axios";
import AddNote from "./AddNote";
import auth0Client from "../../Auth";

class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playground: null
    };
    this.addNote = this.addNote.bind(this);
  }

  async componentDidMount() {
    await this.refreshPlayground();
  }

  async refreshPlayground() {
    const {
      match: { params }
    } = this.props;
    const playground = (await axios.get(
      `http://localhost:8081/${params.playgroundId}`
    )).data;
    this.setState({
      playground
    });
  }

  async addNote(note) {
    await axios.post(
      `http://localhost:8081/note/${this.state.playground.id}`,
      {
        note
      },
      {
        headers: { Authorization: `Bearer ${auth0Client.getIdToken()}` }
      }
    );
    await this.refreshPlayground();
  }

  render() {
    const { playground } = this.state;
    if (playground === null) return <p>Loading...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{playground.name}</h1>
            <p className="lead">{playground.location}</p>
            <hr className="my-4" />
            <AddNote playgroundId={playground.id} addNote={this.addNote} />
            <p>Notes:</p>
            {playground.notes.map((note, idx) => (
              <p className="lead" key={idx}>
                {note.note}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Playground;
