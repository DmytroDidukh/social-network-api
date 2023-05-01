import { Schema, model } from 'mongoose';
import { IUserModel } from 'types/interfaces/user';
import { USER_ACCESS_TYPES } from 'constants/user';

const userSchema = new Schema<IUserModel>(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        hash: { type: String, required: true },
        salt: { type: String, required: true },
        description: { type: String, default: '' },
        city: { type: String, default: '' },
        hometown: { type: String, default: '' },
        birthDate: { type: String, default: '' },
        relationships: { type: String, default: null },
        profilePicture: { type: String, default: '' },
        coverPicture: { type: String, default: '' },
        followers: { type: [String], default: [] },
        followings: { type: [String], default: [] },
        accessType: { type: String, default: USER_ACCESS_TYPES.USER },
    },
    { timestamps: true },
);

const UserModel = model<IUserModel>('User', userSchema);

export { UserModel };
