import React, { Component } from "react"
import { Meteor } from "meteor/meteor"
import { withTracker } from "meteor/react-meteor-data"
import { Assets } from '../../api/assets';

class AssetsTableRow extends Component {
  render() {
    const { name } = this.props.asset

    return (<tr>
      <td>{name}</td>
    </tr>)
  }
}

class AssetsListView extends Component {
  createNewAsset() {
    Meteor.call("assets.insert", "New Asset");
  }

  render() {
    const { assets } = this.props

    console.log(assets)

    return <div>
      <button type="button"
              className="btn btn-sm btn-primary"
              onClick={this.createNewAsset.bind(this)}>New Asset
      </button>
      <table className="table table-striped mt-2">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Asset</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => <AssetsTableRow key={asset._id} asset={asset}/>)}
        </tbody>
      </table>
    </div>
  }
}

export default withTracker(() => {
  Meteor.subscribe('assets');

  return {
    assets: Assets.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user()
  }
})(AssetsListView)