"use strict";

const AppDispatcher = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');
const SessionApiUtil = require('../util/session_api_util');
const ErrorActions = require('./error_actions');
const hashHistory = require('react-router').hashHistory;

const SessionActions = {

  signUp(formData){
    SessionApiUtil.signUp(
      formData,
      SessionActions.receiveCurrentUser,
      ErrorActions.setErrors);
  },

  logIn(formData){
    SessionApiUtil.logIn(
      formData,
      SessionActions.receiveCurrentUser,
      ErrorActions.setErrors);
  },

  loginGuest(){
    SessionApiUtil.logIn(
      {
        username: "sam",
        password: "testing"
      },
      SessionActions.receiveCurrentUser,
      ErrorActions.setErrors);
  },


  logOut() {
    SessionApiUtil.logOut(SessionActions.removeCurrentUser);

  },

  fetchCurrentUser(complete){
    SessionApiUtil.fetchCurrentUser(
      SessionActions.receiveCurrentUser, complete);
  },

  receiveCurrentUser(currentUser) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      currentUser: currentUser
    });
  },

  removeCurrentUser() {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
  }

};

module.exports = SessionActions;
