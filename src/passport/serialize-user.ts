import { IUserModel } from 'types/interfaces/user';

async function serializeUser(user: IUserModel, done) {
    if (user) {
        done(null, user._id);
    }
}

export { serializeUser };
