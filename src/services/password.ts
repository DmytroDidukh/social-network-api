import bcrypt from 'bcrypt';

async function getSalt(): Promise<string> {
    const saltRounds = 12;
    return bcrypt.genSaltSync(saltRounds);
}

async function hashPassword(password: string, salt): Promise<string> {
    return bcrypt.hash(password, salt);
}

async function comparePasswords(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
}

export const passwordService = { hashPassword, comparePasswords, getSalt };
