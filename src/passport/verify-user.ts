import { UserModel } from 'models/user';
import { ApiSignInCredentialsError } from 'api/error';
import { passwordService } from 'services/password';

async function verifyUser(emailOrUsername, password, done) {
    try {
        const user = await UserModel.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
        });
        console.log('USER: ', user);

        if (!user) {
            throw new ApiSignInCredentialsError();
        }

        const isValidPassword = await passwordService.comparePasswords(password, user.hash);

        if (!isValidPassword) {
            throw new ApiSignInCredentialsError();
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}

export { verifyUser };
