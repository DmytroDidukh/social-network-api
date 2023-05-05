import bcrypt from 'bcrypt';

async function getSalt(): Promise<string> {
    const saltRounds = 12;
    return bcrypt.genSaltSync(saltRounds);
}

async function hash(password: string, salt): Promise<string> {
    return bcrypt.hash(password, salt);
}

async function compare(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
}

export const passwordService = { hash, compare, getSalt };
