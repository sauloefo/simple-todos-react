import "bootstrap/dist/css/bootstrap.css"
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/NewApp.js';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
