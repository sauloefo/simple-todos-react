import React, { Component } from "react"
import { Meteor } from "meteor/meteor"
import { withTracker } from "meteor/react-meteor-data"
import AccountsUIWrapper from "./AccountsUIWrapper.js"
import Home from "./Home"

class App extends Component {
  render() {
    const { currentUser } = this.props
  
    return (
      <div className="container">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="#">BM</a>
        </nav>
        <AccountsUIWrapper/>
        {(currentUser)
          ?<div className="mt-3"><Home/></div>
          :''}
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  }
})(App)
