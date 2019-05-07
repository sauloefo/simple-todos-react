import React, { Component } from "react"
import { Meteor } from "meteor/meteor"
import { withTracker } from "meteor/react-meteor-data"
import { Assets } from '../../api/assets';

class AssetsTableRow extends Component {

  handleCheckboxClick(event) {
    this.props.onToogleSelection(this.props.asset._id);
  }

  render() {
    const { asset, isSelected } = this.props

    return (<tr>
      <td>
        <input type="checkbox"
               onClick={this.handleCheckboxClick.bind(this)}
        />
      </td>
      <td>{asset.name}</td>
    </tr>)
  }
}

class AssetsListView extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      selectedIds: []
    }
  }

  createNewAsset() {
    Meteor.call("assets.insert", "New Asset");
  }

  toogleSelection(assetId) {
    const { selectedIds } = this.state

    const remove = selectedIds.some((selectedId) => selectedId === assetId)

    this.setState({
      selectedIds: (remove)
        ? selectedIds.filter(selectedId => selectedId !== assetId)
        : [ ...selectedIds, assetId ]
    })
  }

  deleteSelectedAssets() {
    const { selectedIds } = this.state
    Meteor.call("assets.remove", ...selectedIds)
    this.setState({
      selectedIds: []
    })
  }

  render() {
    const { assets } = this.props
    const { selectedIds } = this.state

    return <div>
      <button type="button"
              className="btn btn-sm btn-primary"
              onClick={this.createNewAsset.bind(this)}>New Asset
      </button>
      <button type="button"
              className="btn btn-sm btn-primary ml-1"
              disabled={selectedIds.length === 0}
              onClick={this.deleteSelectedAssets.bind(this)}>Delete Asset
      </button>
      <table className="table table-striped mt-2">
        <thead className="thead-dark">
          <tr>
            <th scope="col"
                className="fit"
            />
            <th scope="col">Assets</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => <AssetsTableRow key={asset._id} 
                                                 asset={asset}
                                                 onToogleSelection={this.toogleSelection.bind(this)}
                                 />
                     )
          }
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