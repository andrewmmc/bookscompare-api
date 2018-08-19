const functions = require('firebase-functions');
const firebaseAuth = require('firebaseauth');
const { omit: _omit } = require('lodash');

const firebase = new firebaseAuth(functions.config().webapi.key);

function ValidationError(message) {
  this.name = 'ValidationError';
  this.message = message;
}

function postRegister(req, res) {
  try {
    const { body: { email, password } } = req;

    if (typeof email === 'undefined' || typeof password === 'undefined') {
      throw new ValidationError({
        code: 'INVALID_ARGUMENT',
        message: 'Invalid or missing fields.',
      });
    }

    firebase.registerWithEmail(email, password, {}, (error, result) => {
      if (error) {
        // TODO: fix this
        // throw _omit(error, 'originalError');
        return res.status(400).json({
          error: _omit(error, 'originalError')
        });
      }
      return res.status(201).json(result);
    });
  } catch (e) {
    return res.status(400).json({
      error: e.message
    });
  }
}

function postSignin(req, res) {
  try {
    const { body: { email, password } } = req;

    if (typeof email === 'undefined' || typeof password === 'undefined') {
      throw new ValidationError({
        code: 'INVALID_ARGUMENT',
        message: 'Invalid or missing fields.',
      });
    }

    firebase.signInWithEmail(email, password, (error, result) => {
      if (error) {
        // TODO: fix this
        // throw _omit(error, 'originalError');
        return res.status(400).json({
          error: _omit(error, 'originalError')
        });
      }
      return res.status(200).json(result);
    });
  } catch (e) {
    return res.status(400).json({
      error: e.message
    });
  }
}

module.exports = {
  postRegister,
  postSignin,
};
