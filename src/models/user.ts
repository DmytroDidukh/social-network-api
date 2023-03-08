import { Schema, model } from 'mongoose';

interface IUser {
    username: string;
    email: string;
    password: string;
    profilePicture?: string;
    coverPicture?: string;
    followers?: string[];
    followings?: string[];
    isAdmin: boolean;
}

const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, min: 3, max: 30, unique: true },
        email: { type: String, required: true, max: 50, unique: true },
        password: { type: String, required: true, min: 6, max: 16 },
        profilePicture: { type: String, default: '' },
        coverPicture: { type: String, default: '' },
        followers: { type: [String], default: [] },
        followings: { type: [String], default: [] },
        isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true },
);

const User = model<IUser>('User', userSchema);

export { User };
