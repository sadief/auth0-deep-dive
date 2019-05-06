import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Playgrounds from "./components/Playgrounds/Playgrounds";
import Playground from "./components/Playground/Playground";
import Callback from "./Callback";
import NewPlayground from "./NewPlayground/NewPlayground";
import SecuredRoute from "./SecuredRoute/SecuredRoute";
import withSplashScreen from "./components/withSplashScreen";
import { compose } from "redux";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkingSession: true
    };
  }

  async componentDidMount() {
    if (this.props.location.pathname === "/callback") {
      this.setState({ checkingSession: false });
      return;
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <Route exact path="/" component={Playgrounds} />
        <Route exact path="/playground/:playgroundId" component={Playground} />
        <Route exact path="/callback" component={Callback} />
        <SecuredRoute
          path="/new-playground"
          component={NewPlayground}
          checkingSession={this.state.checkingSession}
        />
      </div>
    );
  }
}

export default compose(
  withSplashScreen,
  withRouter
)(App);
