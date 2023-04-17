import mongoose from 'mongoose';

import config from 'config/config';

async function setupDatabase(): Promise<mongoose.mongo.MongoClient> {
    try {
        const m = await mongoose.connect(config.MONGO_URI);
        console.log('CONNECTED TO DB');

        return m.connection.getClient();
    } catch (error) {
        console.error('DB CONNECTION ERROR: ', error);
    }
}

export { setupDatabase };
