import React, { Component } from "react"
import { Meteor } from "meteor/meteor"
import { withTracker } from "meteor/react-meteor-data"
import AccountsUIWrapper from "./AccountsUIWrapper.js"

class App extends Component {
  render() {
    const { currentUser } = this.props
    const hasUser = !currentUser

    console.log(currentUser)
  
    return (
      <div className="container">
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="#">BM</a>
        </nav>
        <AccountsUIWrapper/>
      </div>
    )
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  }
})(App)
