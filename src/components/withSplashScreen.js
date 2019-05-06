import React, { Component } from "react";
import auth0Client from "../Auth";
import Callback from "../Callback";
import "./splash-screen.css";

function LoadingMessage() {
  return (
    <div className="splash-screen">
      App is Loading
      <div className="loading-dot">.</div>
    </div>
  );
}

function withSplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        checkingSession: true
      };
    }

    async componentDidMount() {
      try {
        await auth0Client.silentAuth();
        this.forceUpdate();
        setTimeout(() => {
          this.setState({
            loading: false
          });
        }, 1500);
      } catch (err) {
        if (err.error !== "login_required") console.log(err.error);
      }
      this.setState({ checkingSession: false, loading: false });
    }

    render() {
      //while checking user session, show "loading" message
      if (this.state.loading) return LoadingMessage();

      //otherwise, show desired route
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withSplashScreen;
