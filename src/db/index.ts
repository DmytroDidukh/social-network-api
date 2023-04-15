import mongoose from 'mongoose';

import config from 'config/config';
// TODO: Implement sessions
// https://github.com/jdesboeufs/connect-mongo/blob/master/example/mongoose.js
// https://www.npmjs.com/package/connect-mongo
// https://www.youtube.com/watch?v=J1qXK66k1y4
const setupDatabase = () => {
    return mongoose
        .connect(config.MONGO_URI)
        .then(() => console.log('CONNECTED TO DB'))
        .catch((error) => console.error('DB CONNECTION ERROR: ', error));
};

export { setupDatabase };
