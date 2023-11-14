import jwt from 'jsonwebtoken';

import config from '../config/config';
import IUser from '../interfaces/user';

const signJWT = (
  user: IUser,
  callback: (error: Error | null, token: string | null) => void
): void => {
  var timeSinchEpoch = new Date().getTime();
  var expirationTime =
    timeSinchEpoch + Number(config.server.token.expireTime) * 100000;
  var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  console.log(`Attempting to sign token for ${user.username}`);

  try {
    jwt.sign(
      { username: user.username },
      config.server.token.secret,
      {
        issuer: config.server.token.issuer,
        algorithm: 'HS256',
        expiresIn: expirationTimeInSeconds,
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error: any) {
    console.log(error.message, error);
    callback(error, null);
  }
};

export default signJWT;
