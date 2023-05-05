import { ApiSignInCredentialsError } from 'api/error';
import { passwordService } from 'services/password';
import { userRepository } from 'repositories/user';

async function verifyUser(emailOrUsername, password, done) {
    try {
        const user = await userRepository.getByAny({
            email: emailOrUsername,
            username: emailOrUsername,
        });

        if (!user) {
            return done(new ApiSignInCredentialsError());
        }

        const isValidPassword = await passwordService.comparePasswords(password, user.hash);

        if (!isValidPassword) {
            return done(new ApiSignInCredentialsError());
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}

export { verifyUser };
