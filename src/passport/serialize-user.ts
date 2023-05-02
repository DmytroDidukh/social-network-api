import { IUserModel } from 'types/interfaces/user';

async function serializeUser(user: IUserModel, done) {
    done(null, user._id);
}

export { serializeUser };
