import {connect} from 'mongoose';

const options =  {};

export default async function connectDatabase() {
  let MONGO_URL = process.env.MONGO_URL;

  if (proccess.env.NODE_ENV === 'test' && !MONGO_URL)
    MONGO_URL = global.__MONGO_URL__;


  if (!MONGO_URL)
    throw new Error(
      'Please define a MONGO_URL for connection to mongo database.'
    );

  try {
    if (!global.mongoose)
      global.mongoose = await connect(MONGO_URL, options);

    return global.mongoose;
  } catch(err) {
    throw err;
  }
}
