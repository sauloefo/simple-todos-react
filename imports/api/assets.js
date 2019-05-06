import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Assets = new Mongo.Collection('assets');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish assets that are public or belong to the current user
  Meteor.publish('assets', function tasksPublication() {
    return Assets.find({
      owner: this.userId
    });
  });
}

Meteor.methods({
  'assets.insert'(name) {
    check(name, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Assets.insert({
      name: name,
      createdAt: new Date(),
      owner: this.userId,
    });
  }
});
