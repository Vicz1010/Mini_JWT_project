import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

import User from '../models/User';
import signJWT from '../functions/signJWT';

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Token validated and user has been authorised');

  return res.status(200).json({ message: 'Authorised' });
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { username, password } = req.body;

  bcryptjs.hash(password, 10, (hashError, hash) => {
    if (hashError) {
      return res
        .status(500)
        .json({ message: hashError.message, error: hashError });
    }

    const _user = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      password: hash,
    });

    return _user
      .save()
      .then((user) => {
        return res.status(201).json({ user });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message, error });
      });
  });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;

  User.find({ username })
    .exec()
    .then((users) => {
      if (users.length !== 1) {
        return res.status(401).json({ message: 'Unauthorised' });
      }

      bcryptjs.compare(password, users[0].password, (error, result) => {
        if (error) {
          console.log(error);
          return res.status(401).json({ message: 'Unauthorised' });
        } else if (result) {
          signJWT(users[0], (_error, token) => {
            if (_error) {
              console.log('Unable to sign token:', _error);
              return res
                .status(401)
                .json({ message: 'Unauthorised', error: _error });
            } else if (token) {
              return res.status(200).json({
                message: 'Authorisation Successful',
                token,
                user: users[0],
              });
            }
          });
        }
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};

export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.find()
    .select('-password')
    .exec()
    .then((users) => {
      return res.status(200).json({ users, count: users.length });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};
