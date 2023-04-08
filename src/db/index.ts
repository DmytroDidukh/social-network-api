import mongoose from 'mongoose';

import config from 'config/config';

const setupDatabase = () => {
    return mongoose
        .connect(config.MONGO_URI)
        .then(() => console.log('CONNECTED TO DB'))
        .catch((e) => console.log('DB CONNECTION ERROR: ', e.message));
};

export { setupDatabase };
