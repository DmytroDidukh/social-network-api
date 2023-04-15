import { Schema, model } from 'mongoose';
import { IUserModel } from 'types/interfaces/user';

const userSchema = new Schema<IUserModel>(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        profilePicture: { type: String, default: '' },
        coverPicture: { type: String, default: '' },
        followers: { type: [String], default: [] },
        followings: { type: [String], default: [] },
        isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true },
);

const UserModel = model<IUserModel>('User', userSchema);

export { UserModel };
