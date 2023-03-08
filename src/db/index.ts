import mongoose from 'mongoose';

import config from 'config/config';

mongoose.connect(config.MONGO_URI);
